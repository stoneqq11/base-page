/**
 * config example
 */
var config = {
    fileds: [
        {
            name:'id',
            text:'序号',
            type:'number',
            actions:['list','info'/*, 'search'*/]
        },
        {
            name: 'sort',
            text: '排序',
            type: 'number',
            width: '5%',
            checkType: 'required number',
            actions: ['upd', 'add','list','info'/*, 'search'*/]
        },
        {
            name: 'image',
            text: '图片',
            type: 'img',
            checkType: 'required',
            actions: ['upd', 'add',/*'list',*/'info']
        },
        {
            name: 'title',
            text: '主题名称',
            type: 'text',
            checkType: 'required',
            actions: ['upd', 'add','list','info', 'batchAdd1']
        },
        {
            name: 'rules',
            text: '活动规则',
            type: 'textarea',
            checkType: 'required',
            actions: ['upd', 'add','list','info']
        },
        {
            name: 'startTime',
            text: '开始时间',
            checkType: 'required',
            type: 'date',
            actions: ['upd', 'add','list','info', 'search']
        },
        {
            name: 'endTime',
            text: '结束时间',
            checkType: 'required',
            type: 'time',
            actions: ['upd', 'add','list','info']
        },
        {
            name: 'status',
            text: '状态',
            checkType: 'required',
            enumName:'AWARD_STATUS',
            actions: ['list','info', 'search'],
            type:'select'
        }],
    actions: [
        {action: 'search', text: '查询', url: '/manage/homepage/list'},
        {action:'info', text: '详情', url:'/manage/homepage/info'},
        {action: 'upd', text: '修改', url: '/manage/homepage/upd'},
        {action: 'add', text: '添加', url: '/manage/homepage/add'},
        {action: 'del', text: '删除', url: '/manage/homepage/del'},
        {
            action: 'batchAdd', 
            text: '批量操作', 
            isBatch: true,
            url: '/manage/homepage/list', 
            clz: 'info',
            initFn: function (selectData) {
                console.log(selectData)
            }
        },
        {
            action: 'batchAdd1', 
            text: '批量操作(弹框)', 
            isBatch: true,
            url: '/manage/homepage/list', 
            clz: 'info',
            resetCheck: true,
            initFn: function (selectData) {
                console.log(selectData)
            },
            callbackFn: function ($btn, formValues) {
                console.log($btn);
                console.log(formValues)
            }
        },
        {
            action: 'select',
            text: '选择子项目',
            single: true,
            clz: 'info',
            url: '/manage/homepage/select',
            selectUrl: '/index.html?page=t-t',
            callbackFn: function ($btn, selectData) {
                console.log($btn);
                console.log(selectData)
            }
        }
    ],
    // operateWidth: '170px',
    // operateMoreNumber: 2,
    isBatch: true,
    batchFields: ['id', 'status'],
    positions: [{
        text: '首页',
        url: '/'
    }, {
        text: 'T'
    }]
}

new BasePage().init(config);