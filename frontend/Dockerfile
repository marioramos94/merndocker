FROM node:8.10.0

COPY [".", "/usr/src/frontend"]

WORKDIR /usr/src/frontend

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
