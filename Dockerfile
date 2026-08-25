FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-dev AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./
RUN --mount=type=secret,id=npm_auth_token \
    pnpm config set //npm.pkg.github.com/:_authToken $(cat /run/secrets/npm_auth_token) && \
    pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm run build

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24

ENV NODE_ENV=production
ENV TZ="Europe/Oslo"
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]
