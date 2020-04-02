FROM alpine:latest as builder-static

ENV VERSION 0.68.3

RUN apk add --no-cache curl make

RUN mkdir -p /hugo \
    && cd /hugo \
    && curl -L https://github.com/gohugoio/hugo/releases/download/v${VERSION}/hugo_${VERSION}_linux-64bit.tar.gz | tar -xz \
    && mv hugo /usr/local/bin/hugo

RUN mkdir -p /site

WORKDIR /site

COPY static/posts ./posts
COPY static/themes ./themes
COPY static/config.toml .
COPY static/Makefile .

RUN make build

FROM nginxinc/nginx-unprivileged:alpine

COPY --from=builder-static /site/public /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]