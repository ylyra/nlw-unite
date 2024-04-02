FROM oven/bun AS base

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --production

FROM base AS build

WORKDIR /app

COPY . .
COPY --from=base /app/node_modules ./node_modules

RUN bun run build

FROM build AS release

WORKDIR /app

COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3333

EXPOSE 3333

CMD ["bun", "start"]