FROM node:16.15-bullseye
RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
WORKDIR /app/build
ENV PORT=80
CMD ["node", "index.js"]
