FROM node

MAINTAINER ChengYu "https://github.com/aikeProject"

# 优先将 ./package.json  复制到镜像中，预先加载第三方依赖
COPY . /app/

WORKDIR /app

RUN npm i

# 暴露3000端口
EXPOSE 3000

CMD npm start