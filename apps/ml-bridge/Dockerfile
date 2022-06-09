FROM node:16-alpine as builder
ENV NODE_ENV build

USER root
WORKDIR /home/node

COPY ./* ./

RUN apk add git
RUN apk add openssh
RUN npm install --legacy-peer-deps
RUN npx nx build ml-brige

# ---

FROM node:16-alpine
ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/dist/apps/ml-bridge/* ./

CMD ["node", "index.js"]