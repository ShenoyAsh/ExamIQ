# Build stage
FROM node:18-alpine AS build
ARG VITE_MISTRAL_API_KEY
ENV VITE_MISTRAL_API_KEY=$VITE_MISTRAL_API_KEY
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
