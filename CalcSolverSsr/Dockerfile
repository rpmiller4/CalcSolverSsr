# syntax=docker/dockerfile:1

FROM node:alpine as builder
RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV production

COPY package.json ./
RUN npm install --production

COPY src ./src
COPY public ./public
RUN npm run build -y


FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD [ "node", "build/server.js" ]
