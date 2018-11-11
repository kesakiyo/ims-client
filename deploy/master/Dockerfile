FROM kesakiyo/ims:client-base

MAINTAINER Minho Cheon <kesakiyo@naver.com>

ENV NODE_ENV production

WORKDIR /usr/src/master/ims-client

RUN git config --global user.email "kesakiyo@naver.com" && \
    git config --global user.name "Minho Cheon" && \
    git checkout master && \
    git stash && \
    git pull && \
    npm install && \
    npm run build

EXPOSE 4000

CMD ["npm", "run", "forever"]
