/**
 * @author Stone (shiquan@meizu.com)
 * @date 2015-5-23
 * @description 管理后台通用页面配置控件，通过js配置自动生成管理页面
 */

(function () {
    'use strict';

    // 常量定义
    var constants = {
        // 字段类型对应不同的template
        FILED_DEFAULT_MAP: {
            text: {tpl: 'input-tpl', columnClz: 'align-left'},
            select: {tpl: 'select-tpl', columnClz: 'align-center'},
            radio: {tpl: 'input-tpl', columnClz: 'align-center'},
            checkbox: {tpl: 'checkbox-tpl'},
            date: {tpl: 'date-tpl', columnClz: 'align-center', type: 'text'},
            time: {tpl: 'date-tpl', columnClz: 'align-center', type: 'text'},
            textarea: {tpl: 'textarea-tpl', columnClz: 'text'},
            number: {tpl: 'input-tpl', columnClz: 'align-right', type: 'text'},
            img: {tpl: 'img-init-tpl', columnClz: 'align-center'},
            color: {tpl: 'color-tpl', columnClz: 'align-center', type: 'text'},
            orderButton: {tpl: 'order-tpl', columnClz: 'align-center'},
            order: {tpl: 'input-tpl', columnClz: 'align-center'},
        },

        // 默认操作对应的名称和显示位置
        OPT_MAP: {
            add: { text: '新增', single: false},
            upd: { text: '修改', single: true, clz: 'default'},
            del: { text: '删除', single: true, clz: 'danger'},
            search: { text: '查询', single: false},
            info: { text: '详情', single: true, clz: 'default'},
            copy: { text: '复制', single: true, clz: 'default'}
        },

        // 不同字段类型对应的插件资源
        SOURCE_MAP: {
            date: [
                './css/vendor/jquery-ui.css',
                './js/plugins/jquery-ui-datepicker.js'
            ],
            time: [
                './css/vendor/jquery-ui.css',
                './js/plugins/jquery-ui.js',
                './js/plugins/jquery-ui-timepicker-addon.js'
            ],
            img: [
                './plugins/uploadify/uploadify.css',
                './plugins/uploadify/html5uploader.css',
                './plugins/uploadify/jquery-uploadify.min.js',
                './plugins/uploadify/jquery.html5uploader.js'
            ],
            color: [
                './css/vendor/color-picker.css',
                './js/plugins/color-picker.js'
            ]
        },

        // logger 格式
        LOGGER_LOGO: '||**** COMMON PAGE LOGGER ****||\n'
    }

    /**
     * 通用页面构造器，提供默认的参数值
     * @constructor
     */
    function CommonPage () {
        // config对应每个页面需提供的配置
        this.config = {
            // 页面需要配置的字段，格式如下
            // fileds: [{
            //      name {!string} 字段名称，要求与接口传递字段保持一致
            //      text {!string} 字段中文名称
            //      type {?string} 字段类型，默认值text，
            //            可选值【text||hidden||textarea||select||img||color||radio||checkbox||date||time||number】
            //      isId: {?boolean} 是否主键字段
            //      value {?*} 初始值
            //      width {?string} 列宽【10%||100px】
            //      checkType {?string} 验证类型，支持多个，以空格隔开，包括【
            //              required 不能为空，并在后面自动加*号
            //              url  表示 输入网址
            //              date 日期格式 xxxx-xx-xx
            //              mail 邮箱
            //              number 数字，可以整型，浮点型。
            //              char 英文
            //              chinese 中文
            //              fn:fnName 自定义验证函数名 【fn:manage.validName】
            //      】
            //      checkMessage {?object} 验证提示 {required-message: '', url-message: ''}
            //      actions {?array} 默认全部操作，该字段在哪些操作中显示，可选值：【add||upd||list||search||info】
            //      attrs {} 字段需要额外添加的属性，命名自定
            //      enumName {?string} select类型必填，对应枚举
            //      enumId {?string} select类型，对应value值
            //      enumText {?string} select类型，对应name值
            //      enumParent {?string} 级联上级字段
            //      enumAttr {?string} 附加给下拉框选项的值，多个以逗号分隔，以data-name形式存在
            //      onSelect {?function} 选择选项后回调，参数为选择项jquery object
            //      selectAll {?boolean} select是否有全部选择项,默认true
            //      isAddInfo {?boolean} 新增是否初始化,默认false,【只实用select类型】
            // }, {}]
            fileds: [],

            // 页面需配置的操作，格式如下
            // actions: [{
            //      action {!string} 操作类型，默认提供增删改查复制，也可以添加自定义方法
            //          系统提供操作【add--新增||upd--修改||del--删除||search--查询||info--详情||copy--复制】
            //      text {?string|function} 自定义方法必填，操作中文名称，为function时，参数是该行的数据
            //      url {!url} 接口调用url
            //      beforeSubmit {?function} 提交前回调
            //      callbackFn {?function} 完成操作后的回掉，参数为后台接口返回的result
            //      initFn {?function} 初始化操作，参数为 fileds_relative obj
            //      single {?boolean} 是否针对每条数据的操作，默认false将按钮放置search模块，默认操作忽略该属性
            //      relativeFileds {?array} 进行操作需要用到的关联字段值，以[data-]filed_name形式存储在操作按钮上
            //      isHide {?boolean} 是否隐藏该操作
            //      isBatch {?boolean} 是否批量操作
            //      resetCheck {?boolean} 批量操作后是否清空已选项
            //      selectChild: {
            //          pageUrl: '/index.html?page=t-t&pageNumber=100',
            //          dataUrl: '/manage/homepage/list',
            //          parentId: 'parentId'
            //      }
            //}, {}]
            actions: [],

            // 页面路径配置
            // positions: [{
            //      text {!string} 路径名
            //      url {?url} 路径跳转url
            // }]
            positions: [],

            // 每页展示20条数据
            pageNumber: 25,

            // 配置项-是否显示复制操作
            isCopy: false,

            // 是否显示操作栏
            isOperate: true,

            // 操作栏宽度
            operateWidth: '280px',

            // 操作栏按钮数量大于该值（不为0）时显示为更多样式
            operateMoreNumber: 0,

            // 是否批量操作
            isBatch: false,

            // 批量操作关联字段
            batchFields: [],

            // 配置项-编辑、详情页面以一列或两列显示
            editFormColumns: 1,

            // 扩展-页面初始化完成后需要另外完成的操作
            onPageFinished: $.noop, 

            // 添加当前页面url参数到action url中
            addUrlParam: true,

            // 排序
            order: {
                ordering: false, // 表格是否需要排序
                order: [[1, 'asc']], // 初始排序
                orderRowIndex: -1, // 行排序操作在列表的位置，0开始，-1代表没有行排序
                orderRowUrl: '' // 行排序url
            },

            commonSelectMap: {}
        };

        // 对应数据库id字段，默认设为'id'
        this.idFiled = 'id';

        // 从页面配置中提取常用的url，主要包括新增和查询
        this.urls = {};

        this.tableConfig = {};
    }

    CommonPage.prototype = {

        init: function (config) {

            var _this = this, plugins, urls = [];
            var urlConfig = {}

            _.templateSettings = {
                evaluate    : /\{\{([\s\S]+?)\}\}/g,
                interpolate : /\{\{=([\s\S]+?)\}\}/g,
                escape      : /\{\{html([\s\S]+?)\}\}/g
            };

            // url参数优先级最高
            CU.getUrlParam('isBatch') && (urlConfig.isBatch = CU.getUrlParam('isBatch') === 'true')
            CU.getUrlParam('isOperate') && (urlConfig.isOperate = CU.getUrlParam('isOperate') === 'true')
            CU.getUrlParam('pageNumber') && (urlConfig.pageNumber = CU.getUrlParam('pageNumber'))
            $.extend(true, this.config, config, urlConfig);

            if (this.config.addUrlParam) {
                $.each(this.config.actions, function () {
                    var search = /\?/.test(this.url) ? location.search.replace(/\?/, '&') : location.search;
                    this.url && (this.url += search);
                });
            }

            // 过滤掉不符的配置，获取字段类型，按需加载插件资源
            plugins = this.ruleValid();

            // 按需加载页面插件资源
            $.each(plugins, function () {
                urls = urls.concat(constants.SOURCE_MAP[this] || []);
            });

            // 填充页面
            this.completePage();

            commonUtil.getResources(urls, function () {
                _this.initPlugins($('#search-form'));
                _this.bindEvents();
                _.isFunction(_this.config.onPageFinished) && _this.config.onPageFinished();
                _this.optSearch(true);
            });

            return this;
        },

        /**
         * 规则验证，过滤掉不符合规范的定义
         */
        ruleValid: function () {
            var _this = this, typs = [];

            //fileds
            $.each(this.config.fileds, function (idx, item) {
                item.type = item.type || 'text';
                item.holder = item.text;

                var id = constants.FILED_DEFAULT_MAP[item.type].tpl;
                if ( !id ) {
                    item.valid = false;
                    console.error(constants.LOGGER_LOGO + '无效的字段类型：' + item.type);
                    return;
                }

                if ( item.type == 'select' && !item.enumName ) {
                    item.valid = false;
                    console.error(constants.LOGGER_LOGO + '下拉框[' + item.name + ']未指定enum属性值');
                    return;
                }

                typs.push(item.type);

                //找到id字段名称，找不到默认为'id'
                item.isId === true && (_this.idFiled = item.name);
            });

            this.config.fileds = _.filter(this.config.fileds, function(filed){
                return filed.valid !== false;
            });

            //actions
            $.each(this.config.actions, function(idx, item){
                item.text = item.text || constants.OPT_MAP[item.action].text || '';
                constants.OPT_MAP[item.action] && (item.single = constants.OPT_MAP[item.action].single);

                if ( !item.text ) {
                    item.valid = false;
                    console.log(constants.LOGGER_LOGO + '操作[' + item.action + ']缺少text属性，被过滤');
                    return;
                }

                if (item.selectChild && item.selectChild.pageUrl) {
                    item.selectChild.pageUrl += '&isOperate=false&isBatch=true&isSelect=true'
                }

                if (!item.clz && constants.OPT_MAP[item.action]) {
                    item.clz = constants.OPT_MAP[item.action].clz || ''
                }
                item.action == "search" && (_this.urls.search = item.url);
                item.action == "count" && (_this.urls.count = item.url);
                item.action == "add" && (_this.urls.add = item.url);
            });

            if (this.config.isCopy && this.urls.add) {
                this.config.actions.push({
                    action: 'copy',
                    text: '复制',
                    url: this.urls.add,
                    callbackFn: null,
                    single: true
                });
            }

            this.config.actions = _.filter(this.config.actions, function(action){
                return action.valid !== false;
            });

            this.config.editFormColumns = Math.max(Math.min(this.config.editFormColumns, 2), 1);
            this.config.editFormColumns == 2 && $('.modal-dialog').width('1000px');

            return _.uniq(typs);
        },

        /**
         * 填充完整的html
         */
        completePage: function(){
            this.completePosition()
                .completeSearch()
                .completeOptBtn()
                .completeTable()
                .completeTemplate();
        },

        /**
         * 填充当前位置
         * @returns {CommonPage}
         */
        completePosition: function () {
            var pos = [], len = this.config.positions.length;

            $.each(this.config.positions, function(idx, item){
                !item.url && (item.url = CONSTANTS.DEFAULT_HREF);

                pos.push( idx + 1 == len
                    ? '<li class="active">' + item.text + '</li>'
                    : ('<li><a href="' + item.url + '">' + item.text + '</a></li>') );
            });

            $('.manage-location ol').append(pos.join(''));

            return this;
        },

        /**
         * 填充查询条件
         * @returns {CommonPage}
         */
        completeSearch: function () {
            var fileds = [];

            $.each(this.config.fileds, function (idx, item) {
                if (item.actions && item.actions.length
                        && $.inArray('search', item.actions) == -1
                    || (item.actions && item.actions.length === 0)) return;

                var id = constants.FILED_DEFAULT_MAP[item.type].tpl,
                    $temp = $(MU.tpl('filed-search-tpl', item));

                if ($.inArray(item.type, ['date', 'time', 'datetime']) != -1) {
                    var search = getSearchTime(item);
                    fileds.push($(MU.tpl('filed-search-tpl', search.start)).append(MU.tpl(id, search.start))[0].outerHTML);
                    fileds.push($(MU.tpl('filed-search-tpl', search.end)).append(MU.tpl(id, search.end))[0].outerHTML);
                } else {
                    item.type = constants.FILED_DEFAULT_MAP[item.type].type || item.type;
                    $temp.append(MU.tpl(id, item)).find('.dropdown-toggle').removeClass('form-control');
                    fileds.push($temp[0].outerHTML);
                }
            });

            $('#search-form').append(fileds.join(''));

            return this;
        },

        /**
         * 填充操作按钮
         * @returns {CommonPage}
         */
        completeOptBtn: function () {
            var btns = [];
            var isSelect = CU.getUrlParam('isSelect') === 'true'
            $.each(this.config.actions, function(idx, item){
                if ( item.single || (isSelect && item.action != 'search') ) return;

                btns.push(MU.tpl('btn-tpl', item));
            });

            $('#search-btns').append(btns.join(''));

            return this;
        },

        /**
         * 填充列表
         * @returns {CommonPage}
         */
        completeTable: function () {
            var fileds = [], conf = this.config;

            $.each(conf.fileds, function (idx, item) {
                if (item.actions && item.actions.length && $.inArray('list', item.actions) == -1
                    || (item.actions && item.actions.length === 0)) return;

                fileds.push({
                    title: item.text,
                    data: item.name,
                    width: item.width
                });
            });

            if (conf.isOperate) {
                fileds.push({
                    title: '操作',
                    data: 'actions',
                    width: this.config.operateWidth,
                    orderable: false
                });
            }

            if (conf.isBatch) {
                fileds.unshift({
                    title: '<label for="select-all">全选</label><input type="checkbox" id="select-all"/>',
                    data: 'batch',
                    width: '45px',
                    orderable: false
                });
            }

            if (conf.order.orderRowIndex > -1) {
                fileds.splice(conf.order.orderRowIndex, 0, {
                    title: '调序',
                    data: 'orderRow',
                    width: '35px',
                    orderable: false
                });
            }

            this.tableConfig.colums = fileds;

            return this;
        },

        /**
         * 填充模板
         * @returns {CommonPage}
         */
        completeTemplate: function () {
            // todo
            return this;
        },

        /**
         * 新增、修改、详情html，
         * @param action {?string} 操作类型，默认add
         * @param data {?object} 修改、详情对应的数据
         * @returns {string} 编辑、详情页面字符串
         */
        getEditHtml: function(action, data){
            var htm = [],
                _this = this,
                fileds = $.extend(true, [], this.config.fileds);

            action = action || 'add';
            data = data || {};

            $.each(fileds, function (idx, item) {
                if ( $.inArray(action, item.actions || []) == -1 ) return;

                if (action == 'add') {
                    $.each(data, function (i, n) {
                        if (n.name == item.name) {
                            item.value = n.value;
                            if (n.value) {
                                item.holder = n.text;
                            }
                        }
                    });
                } else {
                    item.value = _.isUndefined(data[item.name]) ? '' : data[item.name];
                }

                item.type == 'select' && ( item.selAll = false );

                var messages = item.checkMessage || {},
                    id = constants.FILED_DEFAULT_MAP[item.type].tpl,
                    $tpl = $(MU.tpl('filed-edit-tpl', item));

                if ( $.inArray(item.type, ['date', 'time']) != -1 ) {
                    item.dataType = item.type;
                    item.value = _this.formatColumn(item.value, item, 'upd');
                }
                if ( item.type == 'checkbox' ) {
                    item.value = (item.value || []).join(CONSTANTS.CHECKBOX_SPLIT);
                }
                item.type = constants.FILED_DEFAULT_MAP[item.type].type || item.type;

                if ( action == 'info' ) {
                    item.value = _this.formatColumn(item.value, item, 'info');
                    $tpl = $(MU.tpl('filed-info-tpl', item));
                } else {
                    var $inp = $tpl
                        .find('.form-group')
                        .append(MU.tpl(id, item))
                        .find('[name="' + item.name + '"]')
                        .attr(messages);
                    item.attrs && $inp.attr(item.attrs);
                }
                htm.push($tpl[0].outerHTML);
            });

            if ( _this.config.editFormColumns == 2 ) {
                var arr = [];
                for ( var i = 0, len = htm.length; i < len; i += 2 ) {
                    var tds = htm.slice(i, i + 2).join('').replace(/<tr>|<\/tr>/gm, '');
                    tds.match(/<td>/gm).length == 1 && (tds = tds.replace('<td>', '<td colspan = "3">'));
                    arr.push(tds);
                }
                return '<tr>' + arr.join('</tr><tr>') + '</tr>';
            } else {
                return htm.join('');
            }

        },

        /**
         * 非默认操作html
         * @param action {!string} 操作类型
         * @returns {string} 对应弹框页面的html
         */
        getOptHtml: function (action) {
            var htm = [],
                _this = this,
                fileds = $.extend(true, [], this.config.fileds);

            $.each(fileds, function (idx, item) {
                if ( $.inArray(action, item.actions) == -1 ) return;

                item.type == 'select' && ( item.selAll = false );

                var messages = item.checkMessage || {},
                    id = constants.FILED_DEFAULT_MAP[item.type].tpl,
                    $tpl = $(MU.tpl('filed-edit-tpl', item));

                if ( $.inArray(item.type, ['date', 'time']) != -1 ) {
                    item.dataType = item.type;
                    item.value = _this.formatColumn(item.value, item, 'upd');
                }
                if ( item.type == 'checkbox' ) {
                    item.value = (item.value || []).join(CONSTANTS.CHECKBOX_SPLIT);
                }
                item.type = constants.FILED_DEFAULT_MAP[item.type].type || item.type;

                var $inp = $tpl
                    .find('.form-group')
                    .append(MU.tpl(id, item))
                    .find('[name="' + item.name + '"]')
                    .attr(messages);
                item.attrs && $inp.attr(item.attrs);

                htm.push($tpl[0].outerHTML);
            });

            return htm.join('');
        },

        /**
         * 事件绑定
         */
        bindEvents: function(){
            var _this = this;

            $('#search-form').find('input[type="text"]').keypress(function(event){
                if( event.which == 13 ) {
                    _this.optSearch(true);
                    event.preventDefault();
                }
            });

            $('.ac-search').click(function(){
                _this.optSearch(true);
            });

            var add = _.find(this.config.actions, function(action){
                return action.action == 'add';
            });
            add && $('.ac-add').click(function(){
                _this.optAdd(add);
            });

            $.each(['upd', 'del', 'info', 'copy'], function(idx, item){
                var action = _.find(_this.config.actions, function(action){
                    return action.action == item;
                });

                action && $('#data-table').on('click', '.ac-' + item, function(){
                    _this.optDefaults(action, $(this));
                });
            });

            // other operation
            $.each(_.filter(this.config.actions, function(action){
                return !_.has(constants.OPT_MAP, action.action);
            }), function(idx, item){
                if ( item.single ) {
                    $('#data-table').on('click', '.ac-' + item.action, function(){
                        _this.optCustom(item, $(this));
                    });
                } else {
                    $('.ac-' + item.action).click(function(){
                        _this.optCustom(item, $(this));
                    });
                }
            });

            $('#data-table').on('click', '#select-all', function () {
                $('#data-table').find('.select-data').prop('checked', $(this).is(':checked'));
            }).on('click', '.select-data', function () {
                var allChecked = true;
                $('.select-data').each(function () {
                    if (!$(this).is(':checked')) {
                        allChecked = false;
                    }
                })
                $('#select-all').prop('checked', allChecked);
            }).on('click', '.glyphicon', function () {
                if (!$(this).hasClass('glyphicon-arrow-up')
                    && !$(this).hasClass('glyphicon-arrow-down')) return;

                var clickId = $(this).parent().data('id'),
                    orderId = ($(this).hasClass('glyphicon-arrow-up')
                        ? $(this).parents('tr').prev()
                        : $(this).parents('tr').next())
                        .find('.order-row').data('id');
                _this.optOrder(clickId, orderId);
            });
        },

        /**
         * 插件初始化，包括日期时间、下拉框、上传
         * @param container {?selector} 父容器
         * @param addFlg {?boolean} 是否为新增操作，主要用于初始化下拉框值
         */
        initPlugins: function(container, addFlg){
            var self = this;
            container = container || 'body';

            //date|time
            $('[data-type="date"],[data-type="time"]', container).each(function(){
                var $this = $(this),
                    _min = $this.attr('data-min'),
                    _max = $this.attr('data-max'),
                    _minDate = $this.attr('data-min-date'),
                    _maxDate = $this.attr('data-max-date'),
                    type = _min ? 'minDate' : (_max ? 'maxDate' : ''),
                    $compare = ( _min || _max ) ? $('[name="' + (_min || _max) + '"]') : null;

                pluginUtil.datePicker($this, type, $compare, {minDate: _minDate, maxDate: _maxDate});
            });

            //select
            $('ul.dropdown-menu[data-enum]', container).each(function () {
                var $sel = $(this),
                    enumName = $sel.attr('data-enum'),
                    $inp = $sel.parent().siblings('input:hidden'),
                    selected = addFlg ? undefined : $inp.val(),
                    enumId = $sel.attr('data-enum-id'),
                    enumText = $sel.attr('data-enum-text');

                var filed = _.find(self.config.fileds, function(filed){
                    return filed.name == $inp.attr('name');
                });

                if (enums[enumName]) {
                    manageUtil.initEnumSelect($sel, selected, filed.onSelect);
                } else if (/\//.test(enumName)) {
                    var parent = $sel.attr('data-enum-parent'),
                        enumConfig = {
                            url: enumName,
                            id: enumId,
                            name: enumText,
                            selMap: self.config.commonSelectMap,
                            onSelect: filed.onSelect
                        },
                        $parent = $('[name="' + parent + '"]', container);

                    if (parent) {
                        enumConfig.container = container;
                        enumConfig.param = {};
                        enumConfig.param[$parent.attr('name')] = $parent.val();
                    }
                    if(!$sel.attr('data-enum-parent')){
                        manageUtil.initAjaxSelect($sel, enumConfig, selected);
                    }
                }
            });
            $('ul.dropdown-menu[data-enum-parent]', container).each(function () {
                var $sel = $(this),
                    enumName = $sel.attr('data-enum'),
                    $inp = $sel.parent().siblings('input:hidden'),
                    enumId = $sel.attr('data-enum-id'),
                    enumText = $sel.attr('data-enum-text');

                var filed = _.find(self.config.fileds, function (filed) {
                    return filed.name == $inp.attr('name');
                });

                var parent = $sel.attr('data-enum-parent'),
                    enumConfig = {
                        url: enumName,
                        id: enumId,
                        name: enumText,
                        onSelect: filed.onSelect
                    },
                    $parent = $('[name="' + parent + '"]', container);

                enumConfig.container = container;
                if (parent) {
                    manageUtil.initParentSelect($sel, $parent, enumConfig);
                }
            });

            //color
            $('.color-picker', container).each(function(){
                pluginUtil.colorPicker($(this));
            });

            //upload
            $('.browse-file', container).each(function(){
                var $this = $(this),
                    _url = $this.siblings('.url-hide').val();

                pluginUtil.uploadImg($this, function(data){
                    var json = JSON.parse(data),
                        url = json.value;
                    manageUtil.imgUploaded($this, url);
                });

                _url && manageUtil.imgUploaded($this, _url);
            });

            //checkbox
            $('.checkbox-wrap', container).each(function(){
                var $this = $(this),
                    data = $this.data(),
                    enumName = data.enum,
                    enumDatas = []

                if (enums[enumName]) {
                    manageUtil.initCheckbox($this, enums[enumName])
                } else if (/\//.test(enumName)) {
                    $.get(enumName, function(result){
                        var datas = result.value.data
                        $.each(datas, function () {
                            data.enumId && (this.value = this[data.enumId]);
                            data.enumText && (this.name = this[data.enumText]);
                        });
                        self.config.commonSelectMap[data.name] = datas
                        manageUtil.initCheckbox($this, datas)
                    })
                }
            })

        },

        /**
         * 更新、复制、删除、详情操作
         * @param action
         * @param $o
         */
        optDefaults: function(action, $o){
            var _this = this;

            switch ( action.action ) {
                case 'upd':
                case 'copy':
                    _this.optUpd(action, $o, action.action == 'copy'); break;
                case 'del':
                    _this.optDel(action, $o); break;
                case 'info':
                    _this.optInfo(action, $o); break;
                default :
                    break;
            }
        },

        /**
         * 默认新增操作
         * @param add {!object} 新增操作配置
         */
        optAdd: function(add){
            if ( !add.url ) {
                add.callbackFn && add.callbackFn();
                return;
            }

            var _this = this, valueInfo = [],  _name, _value, _text,
                $form = $(MU.tpl('form-edit-tpl'));
            $.each(_this.config.fileds, function(i, index) {
                if(index.isAddInfo) {
                    _name = index.name;
                    _value = $('[name="' + index.name + '"]').attr('value');
                    _text = $('[data-info-name="' + index.name + '"]').find('i').text();
                    valueInfo.push({name:_name, value:_value, text:_text});
                }
            });
            $('#common-modal').modal('show');
            $('#common-label').text(add.text);
            $form.find('table.modify-table').append(_this.getEditHtml('add', valueInfo));
            $('#common-body').html($form[0].outerHTML);
            this.initPlugins($('#common-modal'), true);

            add.initFn && add.initFn(valueInfo);

            $('#common-edit-form').validation();
            _this.optEdit(add, _this);
        },

        /**
         * 默认修改操作，复制操作共用
         * @param upd {!object} 更新操作配置
         * @param $o {!jquery object} 更新操作元素
         * @param copyFlg {?boolean} 是否为复制操作
         */
        optUpd: function(upd, $o, copyFlg){
            if ( !upd.url ) {
                upd.callbackFn && upd.callbackFn();
                return;
            }

            var _this = this;

            $('#common-modal').modal('show');
            $('#common-label').text(upd.text);

            var info = _.find(this.config.actions, function(action){
                return action.action == 'info';
            });
            var param = {};
            param[this.idFiled] = $o.attr('data-' + this.idFiled);
            $.get(info.url, param, function(bd){
                    if ( bd.code != 200 ) return;

                    var $form = $(MU.tpl('form-edit-tpl',
                        copyFlg ? {} : {name: _this.idFiled, value: bd.value[_this.idFiled]}
                    ));
                    upd.initFn && upd.initFn(bd.value, $o);
                    $form.find('table.modify-table').append(_this.getEditHtml('upd', bd.value));
                    $('#common-body').html($form[0].outerHTML);
                    _this.initPlugins($('#common-modal'), false);

                    $('#common-edit-form').validation();

                    upd.beforEditCallbackFn && upd.beforEditCallbackFn();
                    _this.optEdit(upd, _this);
                });
        },

        /**
         * 保存操作
         * @param action {!object} 操作配置
         * @param _this {!CommonPage}
         */
        optEdit: function(action, _this){
            $('.ac-sure').off('click').click(function(){
                if (!$('#common-edit-form').valid(this, '请按照规则填写表单信息.')) return false;

				action.beforeSubmit && action.beforeSubmit();

                $.post(action.url, $('#common-edit-form').serializeArray(), function(bd){
                    if (bd.code == 200) {
                        manageUtil.alert(action.text + '成功.', function(){
                            $('#common-modal').modal('hide');
                            _this.optSearch( action.type == 'add' );
                            action.callbackFn && action.callbackFn.call(this, bd);
                        });
                    } else {
                        manageUtil.alert(action.text + '失败：\n' + bd.message, function(){
                            action.callbackFn && action.callbackFn.call(this, bd);
                        });
                    }
                });
            });
        },

        saveOrder: function(action, order, data) {
            data['order'] = order;
            var _this = this;
            $.post(action.url, data, function(bd){
                if (bd.code == 200) {
                    _this.optSearch( action.type == 'add' );
                } else {
                    manageUtil.alert(action.text + '失败：\n' + bd.message, function(){
                        action.callbackFn && action.callbackFn.call(this, bd);
                    });
                }
            });
        },

        filterByUpdate: function(data) {
            var _this = this;
            var result = {};
            result[_this.idFiled] = data[_this.idFiled];
            _.each(_this.config.fileds, function(field) {
                if(_.isUndefined(field.actions) || _.contains(field.actions, 'upd')) {
                    result[field.name] = data[field.name];
                }
            });
            var pkvs = window.location.search.split('&');
            pkvs.shift();
            _.each(pkvs, function(pkv) {
                var a = pkv.split('=');
                result[a[0]] = a[1];
            });
            return result;
        },

        getAction: function(_this, name) {
            return _.find(_this.config.actions, function(action){
                return action.action == name;
            });
        },

        /**
         * 默认详情操作
         * @param info {!object} 详情操作配置
         * @param $o {!jquery object} 详情操作按钮
         */
        optInfo: function(info, $o){
            if ( !info.url ) {
                info.callbackFn && info.callbackFn();
                return;
            }

            var _this = this;

            $('#common-modal').modal('show');
            $('#common-label').text(info.text);

            var param = {};
            param[this.idFiled] = $o.attr('data-' + this.idFiled);
            $.get(info.url, param, function(bd){
                    if ( bd.code != 200 ) return;

                    var $form = $(MU.tpl('form-edit-tpl'));
                    $form.find('table.modify-table').append(_this.getEditHtml('info', bd.value));
                    $('#common-body').html($form[0].outerHTML);

                    info.initFn && info.initFn(bd.value);
            });

            $('.ac-sure').off('click').click(function(){
                $('#common-modal').modal('hide');
            });
        },

        /**
         * 默认删除操作
         * @param del {!object} 删除操作配置
         * @param $o {!jquery object} 删除操作按钮
         */
        optDel: function(del, $o){
            var _this = this;
            var param = {};
            param[this.idFiled] = $o.attr('data-' + this.idFiled);
            manageUtil.confirm('确认删除？', function(){
                del.initFn && del.initFn($o);
                $.post(del.url, param, function(bd){
                        if ( bd.code == 200 ) {
                            manageUtil.alert('删除成功.', function(){
                                _this.optSearch();
                                del.callbackFn && del.callbackFn.call(this, bd);
                            });
                        } else {
                            manageUtil.alert('删除失败:\n' + bd.message, function(){
                                del.callbackFn && del.callbackFn.call(this, bd);
                            });
                        }
                    });
            });
        },

        /**
         * 默认调序操作
         * @param clickId {!string} 点击行id
         * @param orderId {!string} 交换顺序的行id
         */
        optOrder: function (clickId, orderId) {
            var _this = this;
            $.post(this.config.order.orderRowUrl, {current: clickId, next: orderId}, function (bd) {
                if (bd.code != 200) {
                    MU.alert('操作失败：\n' + bd.message);
                } else {
                    _this.optSearch(false);
                }
            });
        },

        /**
         * 自定义操作
         * @param action {!object} action定义
         * @param $o {!jquery object} 点击对象
         */
        optCustom: function (action, $o) {
            var isBatch = !action.single && action.isBatch;
            var isSelect = action.selectChild && action.selectChild.pageUrl;
            var selectData = getSelectData();
            var _html = this.getOptHtml(action.action);
            var _this = this;

            if (isBatch && !selectData.length) {
                MU.alert('请选择数据');
                return;
            }

            if (_html) { // modal
                this.showModal(action, isBatch ? selectData : $o)

                $('.ac-sure').off('click').click(function () {
                    if (!$('#common-edit-form').valid(this, '请按照规则填写表单信息.')) 
                        return false;
                    action.callbackFn && action.callbackFn($o, $('#common-edit-form').serializeArray());
                    _this.closeModal();
                    action.resetCheck && _this.resetCheck();
                })
            } else {
                if (isSelect) {
                    this.optSelect(action, $o);
                } else {
                    action.initFn && action.initFn(isBatch ? selectData : $o);
                    action.resetCheck && _this.resetCheck();
                }
            }
        },

        /**
         * 选择操作
         * @param action {!object} action定义
         * @param $o {!jquery object} 点击对象
         */
        optSelect: function (action, $o) {
            var _this = this;

            $('#common-label').text(action.text);
            $('#common-modal')
                .modal('show').find('.modal-dialog').addClass('large');
            $('#common-body')
                .html(MU.tpl('select-page-tpl', {src: action.selectChild.pageUrl}));

            // 子页面中用来初始化选中
            window.selectChildData = $.extend(true, {id: $o.data(this.idFiled)}, action.selectChild);

            $('#select-frame').load(function () {
                $('.manage-nav,.manage-location,.manage-bottom', window.frames['selectFrame'].document).hide();
                action.initFn && action.initFn($o);
            });

            $('.ac-sure').off('click').click(function () {
                var selected = getSelectData($('#data-table', 
                    window.frames['selectFrame'].document).find('.select-data:checked'));
                if (!selected.length) {
                    MU.alert('请选择数据');
                    return;
                } else {
                    if (action.url) {
                        $.post(action.url, {jsonParams: JSON.stringify({
                            currentData: $o.data(),
                            selectData: selected
                        })}, function(result){
                            if (result.code == 200) {
                                MU.alert(action.text + '成功');
                                $('#common-modal').modal('hide').find('.modal-dialog').removeClass('large');
                                _this.optSearch(true);
                            } else {
                                MU.alert(action.text + '失败：\n' + result.message);
                            }
                        })
                    } else {
                        action.callbackFn && action.callbackFn($o, selected);
                        $('#common-modal').modal('hide').find('.modal-dialog').removeClass('large');
                    }
                }
            });
            $('#common-modal').on('hide.bs.modal', function () {
                setTimeout(function () {
                    $('#common-modal').find('.modal-dialog').removeClass('large');
                }, 100);
            });
        },

        /**
         * 默认查询操作
         * @param fresh {?boolean} 是否刷新到第一页
         */
        optSearch: function(fresh){
            var _this = this,
                params = commonUtil.removeEmptyParam($('#search-form').serializeArray()),
                settings = {
                    ajaxUrl: _this.urls.search,
                    argument: params,
                    tableId: 'data-table',
                    pageCount: _this.config.pageNumber,
                    cb: _this.viewData,
                    commonPage: _this,
                    refresh: fresh,
                    cols: this.tableConfig.colums,
                    order: this.config.order
                },
                select = window.parent && window.parent.selectChildData,
                isSelect = CU.getUrlParam('isSelect');

            if (isSelect && select && select.dataUrl) {
                $.get(select.dataUrl + (select.dataUrl.indexOf('?') >= 0 ? '&' : '?') 
                    + select.parentId + '=' + select.id, function (result) {
                        _this.selectInitData = result.value.data;
                        pluginUtil.dataTable(settings);
                    })
            } else {
                pluginUtil.dataTable(settings);
            }
        },

        /**
         * 列表数据
         * @param bd {!object} 后台接口返回数据；
         *      约定返回格式：{code: 200, value: {data: [{}...], total: 1000}, message: ""}
         * @param page {!CommonPage}
         *
         * @param start {number} 第几条开始
         * @param length {number} 取多少条
         * @param order {object} 排序参数
         *      orderType：[asc|desc] 升序|降序
         *      orderFiled：'' 排序字段
         *
         */
        viewData: function (bd, page) {
            if ( bd.code != 200 ) return [];

            var views = [];
            bd.value.data && $.each(bd.value.data, function (idx, item) {
                var actions = ['<div class="btn-wrap"><div class="btn-group">'],
                    more = [],
                    data = _.clone(item),
                    filedArr = [];

                // 批量操作
                if (page.config.isBatch) {
                    var attrs = [];
                    var checked = _.find(page.selectInitData || [], function (s) {
                        return s[page.idFiled] === data[page.idFiled]
                    }) ? 'checked' : '';
                    $.each(page.config.batchFields, function () {
                        attrs.push('data-' + this + '="' + item[this] + '"');
                    });
                    filedArr.push('<div class="select-wrap"><input type="checkbox" ' 
                        + checked + ' class="select-data" ' + attrs.join(' ') + '/></div>');
                }
                data.batch = filedArr.join('');

                // 行调序
                if (page.config.order.orderRowIndex > -1) {
                    data.orderRow = MU.tpl('order-tpl', {id: data[page.idFiled]});
                }

                //对象显示属性
                $.each(page.config.fileds, function (i, n) {
                    if (this.actions && $.inArray('list', this.actions) == -1) return;
                    data[n.name] = page.formatColumn(item[n.name], n, null, item);
                });

                //操作
                var moreNumber = page.config.operateMoreNumber
                $.each($.extend(true, [], page.config.actions), function (i, n) {
                    if (!n.single || n.isHide) return;

                    _.isFunction(n.text) && (n.text = n.text(item));

                    var $opt = $(MU.tpl('ac-tpl', n)), attrs = {};
                    attrs['data-' + page.idFiled] = item[page.idFiled];
                    n.relativeFileds && $.each(n.relativeFileds, function (j, m) {
                        attrs['data-' + m] = item[m];
                    });

                    if ( moreNumber && actions.length > moreNumber ) {
                        more.push($(MU.tpl('ac-more-li-tpl', n)).attr(attrs)[0].outerHTML);
                    } else {
                        actions.push($opt.attr(attrs)[0].outerHTML);
                    }
                });

                if ( more.length ) {
                    var $more = $('<div>' + MU.tpl('ac-more-tpl') + '</div>');

                    $more.find('ul').append(more.join(''));
                    actions.push($more.html());
                }

                actions.push('</div></div>');
                data.actions = actions.join('');

                views.push(data);
            });

            //当前页无数据，则跳转至上一页
            if ((bd.value && bd.value.data || []).length == 0 
                && $('#data-table_previous').hasClass('previous')) {
               $('#data-table_previous').trigger('click');
            }

            bd.recordsTotal = bd.value.total;
            bd.recordsFiltered = bd.value.total;

            return views;
        },

        /**
         * 根据字段配置，转换字段显示内容
         * @param val {!number|string} 数据库中对应的值
         * @param filed {!object} 字段配置
         * @param action {?string} 操作类型
         * @returns {*} 转换后的值
         */
        formatColumn: function(val, filed, action, allVal){
            if ( val === undefined || val === '' )  return '';

            var _title = '', _text = '';
            if (filed.showFn && _.isFunction(filed.showFn)) {
                _text = filed.showFn(val, allVal);
                _title = '';
            } else {
                switch(filed.type){
                    case 'date':
                        _text = new Date(val).format('yyyy-MM-dd');
                        break;
                    case 'time':
                        if(_.isNull(val)) {
                            _text = '';
                        } else {
                            _text = new Date(val).format('yyyy-MM-dd hh:mm:ss');
                        }
                        break;
                    case 'img':
                        _text = '<img src="' + val + '" alt="icon"/>';
                        break;
                    case 'select':
                        if (enums[filed.enumName]) {
                            _text = enums.getText(filed.enumName, val);
                        } else {
                            _text = this.findSelectText(val)
                        }
                        break;
                    case 'checkbox':
                        var vals = val.split(CONSTANTS.CHECKBOX_SPLIT),
                            texts = []
                        for (var i = 0; i < vals.length; i++) {
                            if (enums[filed.enumName]) {
                                texts.push(enums.getText(filed.enumName, vals[i]));
                            } else {
                                texts.push(this.findSelectText(vals[i]))
                            }
                        }
                        _text = texts.join('  ')
                        break;

                    default :
                        _text = val;
                        _title = val;
                }
                if(filed.type === 'order') {
                    var idv = allVal[this.idFiled];
                    var idn = 'data-' + this.idFiled;
                    var $o = $(this);
                    var _this = this;
                    _this.optDefaults('upd', $o);
                    $(document).off('change', '#field-order-'+idv).on('change', '#field-order-'+idv, function(e) {
                        var order = $(this).val();
                        var ia = _this.getAction(_this, 'info');
                        $.get(ia.url, {'id': idv}, function(data) {
                            _this.saveOrder(_this.getAction(_this, 'upd'), order, _this.filterByUpdate(data.data));
                        });
                    });
                    _text = '<input value="' + val + '" style="width: 80px; text-align: center;" id="field-order-'+idv+'"/>';
                }
            }

            if (action == 'upd')  return _text;

            return MU.tpl(action == 'info' ? 'info-tpl' : 'column-tpl', {
                columnClz: filed.columnClz || constants.FILED_DEFAULT_MAP[filed.type].columnClz,
                columnText: _text,
                columnTitle: _title
            });
        },

        /**
         * 弹出模态框
         * @param action {!object}
         * @param $o
         */
        showModal: function (action, $o) {
            var $form = $(MU.tpl('form-edit-tpl'));
            $('#common-modal').modal('show');
            $('#common-label').text(action.text);
            $form.find('table.modify-table').append(this.getOptHtml(action.action));
            $('#common-body').html($form[0].outerHTML);
            this.initPlugins($('#common-modal'), true);
            $o && action.initFn && action.initFn($o);
            $('#common-edit-form').validation();
        },

        /**
         * 关闭模态框
         */
        closeModal: function () {
            $('#common-modal').modal('hide');
        },

        resetCheck: function () {
            $('.select-data, #select-all').prop('checked', false);
        },

        findSelectText: function (val) {
            var _text;
            $.each(this.config.commonSelectMap, function (i, n) {
                $.each(n,function (j,index) {
                    if (index.value == val) {
                        _text = index.name;
                    }
                });
            });
            return _text;
        }
    };

    function getSearchTime (item) {
        var _start = _.clone(item),
            _end = _.clone(item);

        _start.name = _start.name + CONSTANTS.SEARCH_TIME_START;
        _start.dataType = _start.type;
        _start.holder += CONSTANTS.TIME_START_HOLDER;
        _start.text += CONSTANTS.TIME_START_TEXT;
        _start.type = constants.FILED_DEFAULT_MAP[_start.type].type;

        _end.name = _end.name + CONSTANTS.SEARCH_TIME_END;
        _end.dataType = _end.type;
        _end.holder += CONSTANTS.TIME_END_HOLDER;
        _end.text += CONSTANTS.TIME_END_TEXT;
        _end.type = constants.FILED_DEFAULT_MAP[_start.type].type;

        _start.dataMin = _end.name;
        _end.dataMax = _start.name;

        return {start: _start, end: _end};
    }

    function getSelectData ($selected) {
        var datas = []
        var $o = $selected || $('.select-data:checked')
        $o.each(function () {
            var $s = $(this)
            datas.push($s.data())
        })
        return datas
    }

    window.BasePage = CommonPage;
})();
