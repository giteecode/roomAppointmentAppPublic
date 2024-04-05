import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {

    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {

    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}



const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)

  }
}

const actions = {

  //构建菜单路由
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roleId } = data
      console.log("用户角色", data);
      // if (roles.indexOf('admin') >= 0) {
      ///  accessedRouters = asyncRouterMap
      //} else {
      let accessedRouters = filterAsyncRouter(asyncRoutes, [roleId])
      //  }
      commit('SET_ROUTES', accessedRouters)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
