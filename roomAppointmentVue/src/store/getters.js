const getters = {
  columnType: state => state.table.columnType,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  menuState: state => state.user.menuState,
  avatar: state => state.user.avatar,
  headImage: state => state.user.headImage,
  name: state => state.user.name,
  uploadUrl: state => state.settings.uploadUrl,
  uploadVideoUrl: state => state.settings.uploadVideoUrl,
  baseApi: state => state.settings.baseApi,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  roleId: state => state.user.roleId,
  shopId: state => state.user.shopId,
  userId: state => state.user.userId,
  tenants: state => state.user.tenants,//当前用户所有的租户信息
  currentTenant: state => state.user.currentTenant,//当前默认租户信息
  roleIdOptions: state => state.user.roleIdOptions,

}
export default getters
