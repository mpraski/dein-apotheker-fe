# -- BUILD STATIC --
FROM peaceiris/hugo:latest as builder-static

ENV VERSION 0.68.3

RUN apk add --no-cache curl make && \
    mkdir -p /site

WORKDIR /site

COPY static/content ./content
COPY static/static ./static
COPY static/themes ./themes
COPY static/config.yaml .
COPY static/Makefile .

RUN make build

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

COPY --from=builder-static /site/public /usr/share/nginx/html/static
COPY --from=builder-chatbot /site/dist /usr/share/nginx/html/chatbot
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]