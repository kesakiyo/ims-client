FROM kesakiyo/ims:client-base

MAINTAINER Minho Cheon <kesakiyo@naver.com>

ENV NODE_ENV exp

WORKDIR /usr/src/master/ims-client

RUN git checkout exp && \
    git pull && \
    npm install && \
    npm run build:exp

EXPOSE 4001

CMD ["npm", "run", "forever"]
