FROM node:24-slim


WORKDIR /app/client
COPY app/client/package*.json .
RUN npm install

WORKDIR /app
COPY app/types ./types

WORKDIR /app/client
COPY app/client .

EXPOSE 3300
CMD ["npm", "run", "dev", "--", "--host"]
