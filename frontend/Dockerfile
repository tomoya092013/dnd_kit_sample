FROM node:18.17.1

WORKDIR /frontend

COPY package.json package-lock.json ./

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "dev"]
