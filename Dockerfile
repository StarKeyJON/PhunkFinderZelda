# pull official base image
FROM node:16

# set working directory
WORKDIR ./

# add `/app/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

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
CMD ["npm","start", "dev"]
