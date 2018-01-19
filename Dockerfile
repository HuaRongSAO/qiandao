FROM node:9
# 安装 cnpm 环境
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
        && cnpm i -g pm2\
        && cnpm i -g gulp

# 创建工作环境
RUN mkdir -p /home/service
WORKDIR /home/service

# 复制项目
COPY project /home/service

# 安装依赖
RUN cnpm i && npm run dist

# 暴露文件
VOLUME /home/service/dist/public/files

# 容器对外暴露的端口号
EXPOSE 3000 80

# 容器启动时执行的命令，类似npm run start
#CMD ["npm", "start"]
CMD ["pm2", "start", "dist/bin/www"]