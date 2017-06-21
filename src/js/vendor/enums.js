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
            $.each(array, function (i, n) {
                if (n.value == value) {
                    text = n.text;
                }
            });
        }
        return text;
    },

    AWARD_STATUS: [
        {value: 0, text: '使用中'},
        {value: 1, text: '禁用'}
    ]
};
