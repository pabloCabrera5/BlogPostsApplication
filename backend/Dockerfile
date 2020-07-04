FROM node:12.15.0
# Create app directory
WORKDIR /backend
# Install app dependencies
COPY package*.json /backend/

RUN npm install
# Copy app source code
COPY . /backend/

#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]