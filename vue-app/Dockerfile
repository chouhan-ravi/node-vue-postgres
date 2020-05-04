FROM node:lts-alpine

# install simple http server for serving static content
# RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install

# RUN npm audit fix

# RUN npm install @vue/cli@3.7.0 -g

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app

# build app for production with minification
# RUN npm run build

# CMD [ "http-server", "dist" ]

CMD ["npm", "run", "serve"]