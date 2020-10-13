# -- BUILD CHATBOT --
FROM node:alpine as builder-chatbot

RUN apk add --no-cache make && mkdir -p /site

WORKDIR /site

COPY chatbot/public ./public
COPY chatbot/src ./src
COPY chatbot/tests ./tests
COPY chatbot/babel.config.js .
COPY chatbot/Makefile .
COPY chatbot/package.json .
COPY chatbot/tsconfig.json .
COPY chatbot/.env .
COPY chatbot/.env.production .

RUN make install && make build

# -- ASSEMBLE --
FROM nginxinc/nginx-unprivileged:alpine

COPY --from=builder-chatbot /site/dist /usr/share/nginx/html/chatbot
COPY nginx-chatbot.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]