const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roleCode: state => state.user.roleCode,
  rebuildRoutes: state => state.menu.rebuildMenuList,//菜单+contractRoutes
  routes: state => state.permission.routes, //权限路由
  rebuildMenu: state => state.menu.rebuildMenu,//菜单过滤
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
}
export default getters
