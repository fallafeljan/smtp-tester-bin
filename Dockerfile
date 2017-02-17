FROM node:7.5

RUN mkdir -p /opt/smtp-tester-bin
WORKDIR /opt/smtp-tester-bin

EXPOSE 25

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

COPY . /opt/smtp-tester-bin
RUN $HOME/.yarn/bin/yarn --pure-lockfile --production

CMD ["./bin/smtp-tester.js", "--port", "25"]
