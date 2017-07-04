<h2>运行</h2>
1. npm install
2. node server/app
3. localhost/index.html?page=t-t

<h2>接入后台系统</h2>
1. MANAGE标题、用户名--/index.html中修改
2. 菜单--/menu.json中配置
3. 登录由服务端控制，接口请求返回code=401，会做登陆跳转
4. 上传接口--/src/js/vendor/public.js中upload function中修改

<h2>接口数据格式</h2>

查询：

request:
<code>page=t-t&start=0&length=25&_=1499134580457</code>

response:
<code>{code: 200, value: {data: [{}...], total: 1000}, message: ""}</code>

编辑：

request(Form Data):
<code>
id:1
sort:1
image:https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png
title:title1
rules:rules
startTime:2017-06-20
endTime:2017-06-20 11:39:00
</code>

response:
<code>{code: 200, value: null, message: ""}</code>

详情：

request:
<code>page=t-t&id=1</code>

response:
<code>{code: 200, value: {title: '',...}, message: ""}</code>


<h2>配置</h2>
CONFIG.md：<a href="http://gitlab.meizu.com/shiquan/base-page/blob/master/CONFIG.md">配置</a>