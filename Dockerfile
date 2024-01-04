FROM node:18

WORKDIR /usr/src/app
COPY . packge.json
COPY . .
RUN npm install --force
RUN npm run build
CMD ["npm","run","start"]

EXPOSE 3000



