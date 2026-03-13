FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dev
ENV PATH="/app/node_modules/.bin:${PATH}"
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
