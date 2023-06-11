# For build the backend
FROM node:lts

WORKDIR /usr/src/app

# Copy the source files in workdir
COPY . .

# Install library
RUN ["/usr/local/bin/npm", "install"]
CMD ["npm", "start"]

