FROM node:24-slim


WORKDIR /app/server
COPY app/server/package*.json .
RUN npm install

WORKDIR /app
COPY app/types ./types

WORKDIR /app/server
COPY app/server .

EXPOSE 3300
CMD ["npm", "run", "dev", "--", "--host"]
