FROM nginx:1.23.1

ARG API_URL

# Nginx conf for ReactJS
COPY .docker/nginx/default.conf /etc/nginx/conf.d

# Install dependencies
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

# Build app
WORKDIR /opt/app
COPY src/ src/
COPY public/ public/
COPY package.json tsconfig.json .
RUN npm install --global yarn
RUN yarn
RUN REACT_APP_API_URL=${API_URL} yarn build

# Move builded app folder to nginx source
RUN cp -R build/* /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html

# Remove unused files
RUN rm -rf /opt/app
# Remove unused dependencies
RUN apt purge -y nodejs

EXPOSE 80