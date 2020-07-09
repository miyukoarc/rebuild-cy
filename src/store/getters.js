/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-07-09 17:37:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\store\getters.js
 */
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roleCode: state => state.user.roleCode,
    userId: state => state.user.userId, // zeness 添加 
    uuid: state => state.user.uuid, // zeness 添加
    rebuildRoutes: state => state.menu.rebuildMenuList, //菜单+contractRoutes
    routes: state => state.permission.routes, //权限路由
    rebuildMenu: state => state.menu.rebuildMenu, //菜单过滤
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
}
export default getters