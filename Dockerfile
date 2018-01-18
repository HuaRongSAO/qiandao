FROM node:9
# 安装 cnpm 环境
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
    && cnpm i -g mp2\
    && cnpm i -g gulp

# 创建工作环境
RUN mkdir -p /home/service
WORKDIR /home/service

# 复制项目
COPY project /home/service