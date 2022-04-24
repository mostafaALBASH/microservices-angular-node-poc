FROM node:8.9

COPY . /fe

WORKDIR /fe

RUN npm link @angular/cli@6.1.4

#RUN npm install --save @angular/animations@6.1.0 @angular/common@6.1.0 @angular/compiler@6.1.0 @angular/core@6.1.0 @angular/forms@6.1.0 @angular/http@6.1.0 @angular/platform-browser@6.1.0 @angular/platform-browser-dynamic@6.1.0 @angular/router@6.1.0 body-parser@1.18.2 core-js@2.5.4 cors@2.8.5 express@4.16.2 html2canvas@1.0.0-alpha.12 mongoose@4.13.7 rxjs@6.0.0 zone.js@0.8.26

#RUN npm install --save-dev @angular-devkit/build-angular@0.7.0 @angular/cli@6.1.4 @angular/compiler-cli@6.1.0 @angular/language-service@6.1.0 @types/jasmine@2.8.6 @types/jasminewd2@2.0.3 @types/node@8.9.4 codelyzer@4.2.1 jasmine-core@2.99.1 jasmine-spec-reporter@4.2.1 karma@1.7.1 karma-chrome-launcher@2.2.0 karma-coverage-istanbul-reporter@2.0.0 karma-jasmine@1.1.1 karma-jasmine-html-reporter@0.2.2 protractor@5.4.0 ts-node@5.0.1 tslint@5.9.1 typescript@2.7.2

RUN npm install --save-dev @angular-devkit/build-angular@0.7.0 @angular/compiler-cli@6.1.0 typescript@2.7.2
RUN npm install --production

#RUN chmod 775 /fe/node_modules/.bin/ng
#RUN chmod 775 /fe/node_modules/.bin/ng.cmd


RUN npm run build
EXPOSE 3000

CMD npm run serv