# pull official base image
FROM node:16

# set working directory
WORKDIR ./

# install app dependencies
COPY package.json ./
COPY package-lock.json ./


RUN npm install

CMD ["cd", "./Zelda/zelda-js-master"]
COPY package.json ./
COPY package-lock.json ./
CMD ["cd", "../../"]

RUN npm install


# add app
COPY . .

# start app
CMD ["npm","run", "dev"]
