# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
CMD cd ./Zelda/zelda-js-master
COPY package.json ./
COPY package-lock.json ./
CMD cd ../../client


# add app
COPY . ./

# start app
CMD ["npm", "dev"]