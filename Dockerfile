FROM node

WORKDIR /ap

COPY . /ap

RUN npm install 

EXPOSE 8080

CMD ["node", "Controller/server.js"]
