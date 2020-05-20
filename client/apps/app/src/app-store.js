export const appStore = {
  namespace: 'app',
  state: {
    menuItems: [],
  },
  mutations: {
    setMenuItems(state, {items}) {
      state.menuItems = items;
    },
  },
  actions: {
    async getMenuItems({mutations, state}, {menuItemsService}) {
      if (state.menuItems.length) {
        return;
      }
      const items = await menuItemsService.getAll();
      mutations.setMenuItems.exec({items});
    },
  },
};
