FROM --platform=linux/arm64 node:16

RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libnss3 \
    libxss1 \
    libgbm-dev \
    xdg-utils

ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
