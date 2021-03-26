FROM golang:1 AS builder
COPY . /go/src/chat-server
WORKDIR /go/src/chat-server
RUN update-ca-certificates &&\
    go test -count=1 --test.v ./... &&\
    go get &&\
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/src/chat-server/chat-server

# Dockerfile for lighttpd
# build environment
FROM node:12.2.0-alpine AS buildvue
WORKDIR /app
COPY webui /app
RUN npm install -g @vue/cli && npm install --silent && npm run build

FROM alpine
COPY --from='builder' /go/src/chat-server/chat-server /go/bin/chat-server
COPY --from='builder' /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=buildvue /app/dist/* /go/bin/build/
ENTRYPOINT ["/go/bin/chat-server"]