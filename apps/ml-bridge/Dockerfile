FROM node:16-alpine as builder
WORKDIR /home/node
ENV NODE_ENV build


RUN apk add git

USER node
COPY ./package*.json ./
RUN npm install --legacy-peer-deps --ignore-scripts

COPY ./ ./
RUN npx nx build ml-bridge

# ---

FROM node:16-alpine
WORKDIR /home/node
ENV NODE_ENV production

RUN apk add git

USER node
COPY ./package*.json ./
RUN npm install --legacy-peer-deps --ignore-scripts


COPY --from=builder /home/node/dist ./dist

CMD ["node", "dist/apps/ml-bridge/main.js"]
