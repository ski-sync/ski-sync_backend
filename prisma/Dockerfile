FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install -g npm@10.8.2 && \
    npm install --no-save && \
    npm install -g prisma

# Attend que Postgres soit prêt
COPY prisma/wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

CMD ./wait-for-it.sh postgres:5432 -- npx prisma migrate deploy && npx prisma generate 