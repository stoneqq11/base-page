#### 运行
1. npm install
2. node server/app
3. localhost/page/t/t

##### 接入后台系统
1. MANAGE标题、用户名--/index.html中修改
2. 菜单--/menu.json中配置
3. 登录由服务端控制，接口请求返回code=401，会做登陆跳转
4. 上传接口--/src/js/vendor/public.js中upload function中修改

#### 接口数据格式

查询：

request:
```
page=t-t&start=0&length=25&_=1499134580457
```

response:
```
{code: 200, value: {data: [{}...], total: 1000}, message: ""}
```

编辑：

request(Form Data):
```
id:1
sort:1
image:https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png
title:title1
rules:rules
startTime:2017-06-20
endTime:2017-06-20 11:39:00
```

response:
```
{code: 200, value: null, message: ""}
```

详情：

request:
```
page=t-t&id=1
```

response:
```
{code: 200, value: {title: '',...}, message: ""}
```


#### 配置
[config](https://github.com/stoneqq11/base-page/blob/master/CONFIG.md)
