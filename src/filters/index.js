/*
 * @Author: your name
 * @Date: 2020-04-30 11:26:19
 * @LastEditTime: 2020-06-10 15:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-element-admin\src\filters\index.js
 */
// import parseTime, formatTime and set to filter
export {
    parseTime,
    formatTime
}
from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
    const si = [{
            value: 1E18,
            symbol: 'E'
        },
        {
            value: 1E15,
            symbol: 'P'
        },
        {
            value: 1E12,
            symbol: 'T'
        },
        {
            value: 1E9,
            symbol: 'G'
        },
        {
            value: 1E6,
            symbol: 'M'
        },
        {
            value: 1E3,
            symbol: 'k'
        }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
export function tagName(num) {
    if (num == 0) {
        return '成功'
    } else if (num == 1) {
        return '可爱'
    } else if (num == 2) {
        return '友善'
    } else if (num == 3) {
        return '健谈'
    } else {
        return '优秀'
    }
}

export function tagClass(num) {
    if (num === 0) {
        return 'success'
    } else if (num == 1) {
        return 'info'
    } else if (num == 2) {
        return 'warning'
    } else if (num == 3) {
        return 'danger'
    } else {
        return ''
    }
}

export function btnType(string) {
    if (string === '编辑') {
        return ''
    } else if (string == '删除') {
        return 'danger'
    } else if (string == '详情') {
        return 'primary'
    } else if (string == '聊天记录') {
        return 'primary'
    } else if (string == '设置部门') {
        return 'primary'
    } else if (string == '设置角色') {
        return 'primary'
    } else {
        return 'primary'
    }
}

export function statusType(status) {
    if (status == '1') {
        return '未发送'
    } else if (status == '2') {
        return '已发送'
    } else {
        return '已完成'
    }
}
export function classFilter(str) {
    if (str == 'zip') {
        return 'zip'
    } else if (str == 'txt') {
        return 'TXTCopy'
    } else if (str == 'excel') {
        return 'excel'
    } else if (str == 'pdf') {
        return 'pdf'
    } else {
        return 'file'
    }
}

export function filterRoles(str) {
    if (str == 'super') {
        return '超级管理员'
    } else if (str == 'employee') {
        return '员工'
    } else if (str == 'admin') {
        return '管理员'
    } else if (str == 'riskControlSpecialist') {
        return '风控专员'
    } else {
        return str
    }
}

export function filterExamineListStatus(str) {
    if (str == 'AUDIT_FAILED') {
        return '审核未通过'
    } else if (str == 'TO_BE_REVIEWED') {
        return '等待审核'
    } else {
        return "审核通过"
    }
}

export function filterExamineListStatusType(str) {
    if (str == 'AUDIT_FAILED') {
        return 'danger'
    } else if (str == 'TO_BE_REVIEWED') {
        return 'warning'
    } else {
        return "success"
    }
}

export function filterSendType(str) {
    if (str == '0') {
        return '微信群发'

    } else {
        return "超盈群发"
    }
}

export function filterSendResult(str) {
    if (str == 'HAS_SEND') {
        return '已送达'
    } else if (str == 'NOT_SEND') {
        return '未发送'
    } else {
        return "发送失败"
    }
}