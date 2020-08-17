/*
 * @Author: your name
 * @Date: 2020-07-17 23:18:57
 * @LastEditTime: 2020-08-12 21:06:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\settings.js
 */
module.exports = {

    title: 'Vue Admin Template',

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: false,

    /**
     * @type {boolean} true | false
     * @description open or close tagsview
     */
    tagsView: true,
    showAuth: true,
    api_host: 'http://10.10.10.198', // 本地接口url 骋浩 
    // api_host: 'http://47.114.117.126:9000', // 测试IP
    // api_host: 'http://10.10.10.103', // 杜亮
    // api_host:'http://10.10.10.4:9000', // 光
    // api_host: "http://sidebar.cyscrm.com:9000"// 线上
    // api_host:'http://47.111.161.128:9000/', // 线上IP
}