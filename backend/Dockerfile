FROM node:22-alpine

WORKDIR /app
COPY package*.json /app/
# dadurch, dass package.json und package-lock.json sperat kopiert werden
# werden dependencies nur heruntergeladen, wenn sich auch wirklich
# etwas geaendert hat
RUN npm ci 
# --omit=dev    installiert devDependencies nicht (package.json)
# kann aber dazu fuehren, dass build fehlschlagen kann
COPY . /app/
CMD ["node", "server.js"]
EXPOSE 3000