FROM node:12.16.1-alpine3.9

WORKDIR /usr/app/ot.fllair.partners.api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

# ARG MONGO_URL

# ENV MONGO_URL=$MONGO_URL

# RUN npm run migrate

CMD ["npm", "start"]
