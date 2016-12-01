FROM node:6.9.1

ADD ./package.json /opt/frontend/package.json
ADD ./public /opt/frontend/public
ADD ./src /opt/frontend/src
ADD ./run.sh /opt/frontend/run.sh

WORKDIR /opt/frontend

RUN apt-get update && apt-get install -y gettext-base
RUN npm install

CMD ["./run.sh"]

EXPOSE 9000
