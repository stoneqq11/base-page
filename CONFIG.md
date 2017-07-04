<h2>字段配置说明(fileds)</h2>
<table>
	<thead>
		<tr>
			<th>属性</th>
			<th>示例</th>
			<th>类型</th>
			<th>必填</th>
			<th>说明</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>name</td>
			<td>name: 'title'</td>
			<td>string</td>
			<td>是</td>
			<td>对应接口中字段属性名称</td>
		</tr>
		<tr>
			<td>text</td>
			<td>text: '标题'</td>
			<td>string</td>
			<td>是</td>
			<td>页面中字段显示的文本</td>
		</tr>
		<tr>
			<td>type</td>
			<td>type: 'text'</td>
			<td>string</td>
			<td>否</td>
			<td>字段类型，默认text，可选[text|hidden|textarea|select|img|color|checkbox|date|time|number]</td>
		</tr>
		<tr>
			<td>isId</td>
			<td>isId: false</td>
			<td>boolean</td>
			<td>否</td>
			<td>是否为主键字段，默认主键字段为'id'</td>
		</tr>
		<tr>
			<td>value</td>
			<td>value: ''</td>
			<td>string|int</td>
			<td>否</td>
			<td>新增操作中初始值</td>
		</tr>
		<tr>
			<td>actions</td>
			<td>actions: ['search', 'list', 'add', 'upd']</td>
			<td>array</td>
			<td>是</td>
			<td>定义该字段在那些操作中显示</td>
		</tr>
		<tr>
			<td>attrs</td>
			<td>attrs: {addValue: 1}</td>
			<td>plan object</td>
			<td>否</td>
			<td>附加给字段的属性，在编辑状态中可用</td>
		</tr>
		<tr>
			<td>enumName</td>
			<td>enumName: 'STATUS|/manage/status/list'</td>
			<td>string|url</td>
			<td>否[type:select|checkbox字段必填]</td>
			<td>[select|checkbox]枚举字段名称，或者对应ajax接口</td>
		</tr>
		<tr>
			<td>enumId</td>
			<td>enumId: 'statu_value'</td>
			<td>string</td>
			<td>否</td>
			<td>[select|checkbox]枚举key，默认值'value'</td>
		</tr>
		<tr>
			<td>enumText</td>
			<td>enumText: 'statu_text'</td>
			<td>string</td>
			<td>否</td>
			<td>[select|checkbox]枚举text，默认值'text'</td>
		</tr>
		<tr>
			<td>enumParent</td>
			<td>enumParent: 'STATUS'</td>
			<td>string</td>
			<td>否</td>
			<td>[select]级联下拉框，对应的父级field name</td>
		</tr>
		<tr>
			<td>enumAttr</td>
			<td>enumAttr: 'title,id'</td>
			<td>string</td>
			<td>否</td>
			<td>[select]附加给下拉框选项的值，多个以逗号分隔，以data-title形式存在</td>
		</tr>
		<tr>
			<td>onSelect</td>
			<td>onSelect: function($select){}</td>
			<td>function</td>
			<td>否</td>
			<td>[select]选择选项后的回调</td>
		</tr>
		<tr>
			<td>selectAll</td>
			<td>selectAll: true</td>
			<td>boolean</td>
			<td>否</td>
			<td>[select]是否显示‘全部’选项，默认值true</td>
		</tr>
		<tr>
			<td>initFromSearch</td>
			<td>initFromSearch: true</td>
			<td>boolean</td>
			<td>否</td>
			<td>[select]新增是否初始化为当前查询条件的值</td>
		</tr>
		<tr>
			<td>width</td>
			<td>width: '200px'</td>
			<td>string</td>
			<td>否</td>
			<td>列表中该列的宽度</td>
		</tr>
		<tr>
			<td>checkType</td>
			<td>checkType: 'required chinese'</td>
			<td>string</td>
			<td>否</td>
			<td>
				<p>字段验证类型，支持多个，以空格分隔</p>
				<ul>
					<li>required: 不能为空</li>
					<li>url: 输入网址</li>
					<li>date: 日期格式 xxxx-xx-xx</li>
					<li>mail: 邮箱</li>
					<li>number: 数字，可以整型，浮点型</li>
					<li>char: 英文</li>
					<li>chinese: 中文</li>
					<li>fn:fnName 自定义验证函数名 [fn:manage.validName]</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td>checkMessage</td>
			<td>checkMessage: {required-message: '标题不能为空'}</td>
			<td>plan object</td>
			<td>否</td>
			<td>验证提示，不填写则为默认提示</td>
		</tr>
	</tbody>
</table>


<h2>操作配置说明(actions)</h2>
<table>
	<thead>
		<tr>
			<th>属性</th>
			<th>示例</th>
			<th>类型</th>
			<th>必填</th>
			<th>说明</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>action</td>
			<td>action: 'add'</td>
			<td>string</td>
			<td>是</td>
			<td>操作类型，默认操作：[add--新增|upd--修改|del--删除|search--查询|info--详情|copy--复制]</td>
		</tr>
		<tr>
			<td>text</td>
			<td>text: '添加'|function(data){return data.id + data.name}</td>
			<td>string|function</td>
			<td>否[自定义操作必填]</td>
			<td>操作中文名称，为function时，参数是该行的数据</td>
		</tr>
		<tr>
			<td>url</td>
			<td>url: '/manage/add'</td>
			<td>url</td>
			<td>否[默认操作必填]</td>
			<td>接口调用url，自定义操作url不为空则调用url，为空则调用callbackFn</td>
		</tr>
		<tr>
			<td>single</td>
			<td>single: true</td>
			<td>boolean</td>
			<td>否</td>
			<td>是否为单行操作，默认操作忽略该属性</td>
		</tr>
		<tr>
			<td>isHide</td>
			<td>isHide: true</td>
			<td>boolean</td>
			<td>否</td>
			<td>是否隐藏该操作，例如不显示详情操作，但需要提供详情接口</td>
		</tr>
		<tr>
			<td>isBatch</td>
			<td>isBatch: true</td>
			<td>boolean</td>
			<td>否</td>
			<td>是否为批量操作</td>
		</tr>
		<tr>
			<td>isCopy</td>
			<td>isCopy: true</td>
			<td>boolean</td>
			<td>否</td>
			<td>是否为复制单个字段操作，需要配置relativeFileds</td>
		</tr>
		<tr>
			<td>selectChild</td>
			<td>selectChild: {pageUrl: '/index.html?page=t-t', dataUrl: '/manage/t/list', parentId: 'tId'}</td>
			<td>plan object</td>
			<td>否</td>
			<td>从另外的页面(pageUrl)挑选内容，如果dataUrl不为空，调用接口(dataUrl,加上本页记录id: parentId)初始化选中项</td>
		</tr>
		<tr>
			<td>resetCheck</td>
			<td>resetCheck: true</td>
			<td>boolean</td>
			<td>否</td>
			<td>批量操作后是否自动清空选择项</td>
		</tr>
		<tr>
			<td>relativeFileds</td>
			<td>relativeFileds: ['name', 'status']</td>
			<td>array</td>
			<td>否</td>
			<td>该操作需要关联的字段，以data-name形式存储在操作按钮上，默认存储data-id</td>
		</tr>
		<tr>
			<td>initFn</td>
			<td>initFn: function($btn){}</td>
			<td>function</td>
			<td>否</td>
			<td>在弹出modal，初始化插件后，validation之前执行</td>
		</tr>
		<tr>
			<td>beforeSubmit</td>
			<td>beforeSubmit: function(formValues){}</td>
			<td>function</td>
			<td>否</td>
			<td>在提交form表单前调用</td>
		</tr>
		<tr>
			<td>callbackFn</td>
			<td>callbackFn: function(result){}</td>
			<td>function</td>
			<td>否</td>
			<td>提交表单返回结果后调用</td>
		</tr>
	</tbody>
</table>