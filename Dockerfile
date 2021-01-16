# -- BUILD CHATBOT --
FROM node:alpine as builder

RUN apk add --no-cache make

WORKDIR /site

COPY ./public ./public
COPY ./src ./src
COPY ./tests ./tests
COPY ./babel.config.js .
COPY ./Makefile .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./vue.config.js .
COPY ./vuejs-datepicker.d.ts .
COPY ./.env .
COPY ./.env.production .

RUN make install && make build

# -- ASSEMBLE --
FROM nginxinc/nginx-unprivileged:alpine

COPY --from=builder /site/dist /usr/share/nginx/html/chatbot
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]