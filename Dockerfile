FROM node:14.18.1-alpine3.12 AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build

FROM node:14.18.1-alpine3.12
WORKDIR /usr/src/app
COPY --from=builder /app ./
EXPOSE 3000
CMD yarn start:prod