FROM kesakiyo/ims:client-base

MAINTAINER Minho Cheon <kesakiyo@naver.com>

WORKDIR /usr/src/master/ims-client

RUN git checkout master && \
    git pull && \
    npm install && \
    npm run build

EXPOSE 4000

CMD ["npm", "run", "forever"]
