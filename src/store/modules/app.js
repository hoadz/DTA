// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    // {
    //   title: 'Dashboard',
    //   icon: 'mdi-view-dashboard',
    //   to: '/',
    // },
    // {
    //   title: 'User Profile',
    //   icon: 'mdi-account',
    //   to: '/components/profile/',
    // },
    // {
    //   title: 'Regular Tables',
    //   icon: 'mdi-clipboard-outline',
    //   to: '/tables/regular/',
    // },
    // {
    //   title: 'Typography',
    //   icon: 'mdi-format-font',
    //   to: '/components/typography/',
    // },
    // {
    //   title: 'Icons',
    //   icon: 'mdi-chart-bubble',
    //   to: '/components/icons/',
    // },
    
   
    {
      title: 'Ngày - Sự kiện',
      icon: '1',
      to: '/components/event/',
    },
    {
      title: 'Thông báo/Lời chúc',
      icon: '2',
      to: '/components/notifications/',
    },
    {
      title: 'Quản lý user',
      icon: '3',
      to: '/maps/google/',
    },
    // {
    //   title: 'texteditor',
    //   icon: 'mdi-bell',
    //   to: '/components/texteditor/',
    // },
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
