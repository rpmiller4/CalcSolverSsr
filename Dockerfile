# syntax=docker/dockerfile:1

FROM node:alpine as builder
RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV production

COPY CalcSolverSsr/package.json ./
COPY CalcSolverSsr/sitemap-builder.js ./
RUN npm install --production
RUN npm run sitemap
COPY CalcSolverSsr/src ./src
COPY CalcSolverSsr/public ./public

RUN npm run build



FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD [ "node", "build/server.js" ]
