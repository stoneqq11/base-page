var enums = {
    /**
     * 根据值获取text
     * @param arrayName {!string} 枚举key
     * @param value {!number|string}
     * @returns {string}
     */
    getText: function (arrayName, value) {
        var array = enums[arrayName], text = '';

        if (!array) {
            console.error("名称为[" + arrayName + "]的数组不存在于枚举中");
        } else {
            if (_.isArray(array)) {
                $.each(array, function (i, n) {
                    if (n.value == value) {
                        text = n.text;
                    }
                }); 
            } else {
                for (var k in array) {
                    $.each(array[k], function (i, n) {
                        if (n.value == value) {
                            text = n.text;
                        }
                    });
                }   
            }
        }
        return text;
    },

    AWARD_STATUS: [
        {value: 0, text: '使用中'},
        {value: 1, text: '禁用'}
    ],

    AWARD_STATUS_CHILD: {
        0: [
            {value: 10, text: '使用中1'},
            {value: 11, text: '禁用1'}
        ],
        1: [
            {value: 110, text: '使用中11'},
            {value: 111, text: '禁用11'}
        ]
    },
};
