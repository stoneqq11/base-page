/**
 * config example
 */
var clipboard;
window.TIME_START_TEXT = 'aaaa'
window.TIME_END_TEXT = 'bbb'
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
            checkType: 'required number',
            multi: true,
            actions: ['upd', 'add','list','info'/*, 'search'*/]
        },
        {
            name: 'image',
            text: '图片',
            type: 'img',
            multi: true,
            checkType: 'required',
            actions: ['upd', 'add',/*'list',*/'info']
        },

        {
            name: 'title',
            text: '主题名称',
            // width: '200px',
            type: 'text',
            // checkType: 'required chinese',
            attrs: {id: 1},
            actions: ['upd', 'add','list','info', 'batchAdd1', 'cust']
        },
        // {
        //     name: 'rules',
        //     text: '活动规则',
        //     type: 'textarea',
        //     checkType: 'required',
        //     width: '300px',
        //     actions: ['upd', 'add','list','info']
        // },
        // {
        //     name: 'startTime',
        //     text: '开始时间',
        //     checkType: 'required',
        //     type: 'date',
        //     actions: ['upd', 'add','list','info', 'search', 'cust']
        // },
        {
            name: 'endTime',
            text: '结束时间',
            checkType: 'required',
            type: 'time',
            multi: true,
            actions: ['upd', 'add','list','info']
        },
        {
            name: 'status',
            text: '状态',
            checkType: 'required',
            multi: true,
            enumName:'AWARD_STATUS',
            actions: ['list','info', 'search', 'add', 'upd'],
            type:'select'
        },
        // {
        //     name: 'status2',
        //     text: '子状态',
        //     checkType: 'required',
        //     enumName:'AWARD_STATUS_CHILD',
        //     actions: ['list','info', 'search', 'add', 'upd'],
        //     type:'select',
        //     enumParent: 'status',
        //     showFn: function (val, rowData) {
        //         return '<a href="' + rowData.link + '">'+ val +'</a>'
        //     }
        // },
        // {
        //     name: 'contents',
        //     text: '内容',
        //     type: 'select',
        //     enumName: '/manage/homepage/list',
        //     enumId: 'id',
        //     enumText: 'title',
        //     actions: ['batchAdd1', /*'search', */'list', 'add', 'upd', 'info'],
        //     selAll: true,
        //     isAddInfo: true
        // },
        {
            name: 'editor',
            text: '状态',
            checkType: 'required',
            actions: ['info', 'add', 'upd'],
            type:'editor'
        }
    ],
    actions: [
        {action: 'search', text: '查询', url: '/manage/homepage/list'},
        {action:'info', text: '详情', url:'/manage/homepage/info'},
        {action: 'upd', text: '修改', url: '/manage/homepage/upd'},
        {action: 'add', text: '添加', url: '/manage/homepage/add'},
        {action: 'del', text: '删除', url: '/manage/homepage/del'},
        {
            action: 'cust', 
            text: '其他', 
            clz: 'info',
            callbackFn: function (formValues) {
                var clip = new Clipboard('.ac-sure', {
                    text: function() {
                        var result = $.ajax(url, {async: false, data: formValues, method: 'POST'}).responseJSON
                        return result.value.xxx
                    }
                });

                clip.on('success', function(e) {
                    $('#common-modal').modal('hide');
                    MU.alert('复制xxxx成功', true);
                });

                clip.on('error', function(e) {
                    $('#common-modal').modal('hide');
                    MU.alert('复制xxx失败');
                });
            }
        },
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
            text: function(rowData) {
                if (rowData.id == 1) {
                    return '1'
                }
                return null
            },
            single: true,
            clz: 'info',
            relativeFileds: ['id', 'sort'],
            selectChild: {
                pageUrl: '/index.html?page=t-t&pageNumber=100',
                dataUrl: '/manage/homepage/list',
                parentId: 'parentId'
            },
            callbackFn: function ($btn, selectData) {
                console.log($btn.data());
                console.log(selectData)
            }
        },
        {
            action: 'select1',
            text: '选择',
            clz: 'info',
            url: '/manage/homepage/select',
            selectChild: {
                pageUrl: '/index.html?page=t-t&pageNumber=100'
            }
        },
        {
            action: 'copyContent',
            text: '复制内容',
            clz: 'info',
            isCopy: true,
            copyFn: function (rowData, btn) {
                return rowData.id;
            }
        }
    ],
    operateWidth: '350px',
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