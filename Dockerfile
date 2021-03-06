ARG image_tag=latest

FROM node:12-alpine@sha256:5646d1e5bc470500414feb3540186c02845db0e0e1788621c271fbf3a0c1830d as source
MAINTAINER eLife Reviewer Product Team <reviewer-product@elifesciences.org>

WORKDIR /app

COPY  tsconfig.build.json \
      tsconfig.json \
      .eslintignore \
      .eslintrc.js \
      .prettierrc.js \
      package.json \
      yarn.lock \
      ./

COPY src/ ./src/
RUN yarn &&\
    yarn build

FROM node:12-alpine@sha256:5646d1e5bc470500414feb3540186c02845db0e0e1788621c271fbf3a0c1830d
MAINTAINER eLife Reviewer Product Team <reviewer-product@elifesciences.org>

WORKDIR /app

COPY --from=source /app/node_modules/ ./node_modules/
COPY --from=source /app/dist/ ./dist/
COPY mock-data/ /app/mock-data/

EXPOSE 3000

HEALTHCHECK --interval=1m --timeout=1s \
	CMD echo -e "GET /health\n\n" | nc localhost:3003

CMD ["node", "dist/main.js"]
