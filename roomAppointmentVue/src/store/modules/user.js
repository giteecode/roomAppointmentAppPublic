import { post } from "@/utils/http";
import { UserSignIn, UserSignOut, UserHome } from "@/api/identiys";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { ReplaceSourceHttp } from "@/utils/index";
import { resetRouter } from "@/router";
const getDefaultState = () => {
  return {
    token: getToken(),
    userId: "",
    name: "",
    avatar: "",
    roleId: "",
    shopId: "",
    permissions: [],
    menuState: false,
    menuTree: [],
    tenants: [],
    currentTenant: null,
    roleIdOptions: [
      {
        name: "管理员",
        value: 0,
        label: "管理员",
      },
      {
        name: "学生",
        value: 1,
        label: "学生",
      },
      {
        name: "老师",
        value: 2,
        label: "老师",
      },
    ],
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_MENU_STATE: (state, menuState) => {
    state.menuState = menuState;
  },

  SET_RoleId: (state, roleId) => {
    state.roleId = roleId;
  },
  SET_PERMISIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  SET_MENU_TREE: (state, menuTree) => {
    state.menuTree = menuTree;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_TENANTS: (state, tenants) => {
    state.tenants = tenants;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
  SET_CURRENT_TENANT: (state, currentTenant) => {
    state.currentTenant = currentTenant;
  },
  SET_SHOPID: (state, shopId) => {
    state.shopId = shopId;
  },
};

const actions = {
  /**
   * 用户登录
   * @param {*} param0
   * @param {*} userInfo
   * @returns
   */
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    console.log("登录");
    let {
      data: { token },
    } = await post("/user/login", {
      userName: username,
      password: password,
    });
    console.log("报错");
    if (token) {
      commit("SET_TOKEN", token);
      setToken(token);
    }
    return token;
  },

  /**
   * 获取配置信息
   * @param {*} param0
   */
  async LoadSetting({ commit, state }) {
    let {
      data: { userName, avatar, roleId, id, shopId },
    } = await post("/user/detailByToken", {});
    commit("SET_MENU_STATE", true);
    commit("SET_NAME", userName);
    commit("SET_AVATAR", avatar);
    commit("SET_USERID", id);
    commit("SET_SHOPID", shopId);
    console.log(roleId);
    commit("SET_RoleId", roleId);
  },
  /**
   * 获取用户权限
   * @param {*} param0
   */
  getPermission({ commit, state }) {
    //  commit("SET_PERMISIONS", ["12"]);
  },
  /**
   * 获取菜单树
   * @param {*} param0
   */
  getMenuTree({ commit, state }) {
    return state.menuTree;
  },

  /**
   * 获取用户角色
   * @param {*} param0
   */
  getroleId({ commit, state }) {
    return state.roleId;
  },
  /**
   * 登出
   * @param {*} param0
   */
  async logout({ commit, state }) {
    removeToken(); // must remove  token  first
    resetRouter();
    commit("RESET_STATE");
    commit("SET_MENU_STATE", false);
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
