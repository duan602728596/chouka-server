【黄彤扬应援会】摩点打赏监听机器人抽卡服务端。

* 框架使用next.js
* 数据库使用mariaDB或mysql
* 机器人请移步[https://github.com/duan602728596/qqtools/tree/qqtools2-chouka](https://github.com/duan602728596/qqtools/tree/qqtools2-chouka)

## 配置方法

### 代码的部署
1、下载node和yarn   
2、在当前目录运行`npm install`或`yarn install`   
3、开发环境运行`npm start`，生产环境运行`npm run build`   
4、服务器运行`npm run server`   
5、`server/config.js`可以配置服务的端口、数据库、token等   
6、`components/CARD.js`配置卡牌信息。id：卡的唯一编号，name：卡的名称，src：卡的网络图片地址。   
7、数据库初始化脚本请运行`创建数据表.sql`   
8、网站的修改请阅读**next.js**的官方文档

## 接口

### 网站
> 修改网站页面请到pages和components文件夹下

1、网站地址：【GET】/   
2、卡牌图鉴：【GET】/card   
3、卡牌查询：【GET】/search

### API
> API和服务器相关请到server文件夹下

1、抽卡接口：【POST】/_api/storagecard   
  * token：config内配置的token字符串经过md5加密后的32位字符串
  * nickname：摩点昵称
  * userid：摩点的userid
  * record：抽到的卡片的id，Array<string>，例如`['ssr_1', 'ssr_1', 'n_3']`

2、查询接口：【POST】/_api/queryjson   
  * token：config内配置的token字符串经过md5加密后的32位字符串
  * nickname：摩点昵称