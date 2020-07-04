FROM node:12.15.0
# Create app directory
WORKDIR /frontend/simpleblog
# Install app dependencies
COPY package*.json /frontend/simpleblog/

RUN npm install
# Copy app source code
COPY . /frontend/simpleblog/

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]