FROM node:24-alpine AS node
RUN corepack enable
RUN mkdir -p /app

FROM node AS deps

WORKDIR /app

COPY ./.yarnrc.yml .
COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM node AS build
WORKDIR /app

COPY --from=deps /app/.yarnrc.yml .
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 2: Serve the deploy tool using Nginx
FROM nginx:alpine AS server

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
