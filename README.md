# 环境需求
node v6 以上

mongodb v3 以上


# 运行

配置cnpm ： npm install -g cnpm --registry=https://registry.npm.taobao.org

配置pm2 ： cnpm i -g mp2

下载文件： git clone  git@github.com:HuaRongSAO/qiandao.git --depth 1

切换到 qiandao

安装依赖 ： cnpm i

运行编译： cnpm run dist

p部署到生产环境服务器： pm2 start /dist/bin/www
 
 访问3000端口

