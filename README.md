<h2>运行</h2>
1. npm install
2. node server/app
3. localhost/index.html?page=t-t

<h2>接入后台系统</h2>
1. MANAGE标题、用户名--/index.html中修改
2. 菜单--/menu.json中配置
3. 登录由服务端控制
4. 上传接口--/src/js/vendor/public.js中upload function中修改

<h2>页面配置说明</h2>
基础配置在--/src/js/vendor/base-page.js中config对应的注释

<h2>自定义操作三种典型流程</h2>
<h6>1. 批量操作，在initFn中回传选择的数据</h6>
<code>{
action: 'custom',
text: '批量操作',
url: '/manage/custom',
isBatch: true,
initFn: function (selectData) {console.log(selectData)}
}</code>

<h6>2. 选择子项目，在选择页面弹出后执行initFn($btn)，回传点击按钮上的数据；<br/>
在选择数据后点击确定，执行callbackFn($btn, selectData)，回传选择的数据；<br/>
选择子项目点击确定后弹框自动关闭</h6>
<code>{
action: 'custom',
text: '选择子项目',
url: '/manage/custom',
selectUrl: '/index.html?page=t-t',
initFn: function ($btn) {console.log($btn.data())},
callbackFn: function ($btn, selectData) {console.log(selectData)}
}</code>

<h6>3. 弹模态框，遍历files，判断其actions字段是否含有'custom'，对应是否弹框<br/>
弹框情况下，在弹出模态框之后，调用initFn(obj)，点击确定，调用callbackFn(formValues)，回传表单值<br/>
非弹框情况，直接调用initFn(obj)<br/>
其中obj = isBatch ? selectData : $btn</h6>
<code>{
action: 'custom',
text: '弹模态框',
url: '/manage/custom',
initFn: function (obj) {},
callbackFn: function (values) {console.log(values)}
}</code>

<h2>接口数据格式</h2>

查询：

request:
<code>
page:t-t
param[start]:0
param[length]:25
param[startTime_end]:2017-06-08
param[status]:0
_:1498029062044
</code>

response:
<code>{code: 200, value: {data: [{}...], total: 1000}, message: ""}</code>

编辑：

Form Data:
<code>
id:1
sort:1
image:https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png
title:title1
rules:rules
startTime:2017-06-20
endTime:2017-06-20 11:39:00
</code>

详情：

response:
<code>{code: 200, value: {title: '',...}, message: ""}</code>