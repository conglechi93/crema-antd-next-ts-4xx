FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn install \
    && yarn cache clean \
    && yarn add --dev @types/node
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]