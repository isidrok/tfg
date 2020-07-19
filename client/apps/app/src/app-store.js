export const appStore = {
  namespace: 'app',
  state: {
    menuItems: [],
  },
  actions: {
    async getMenuItems({state}, {menuItemsService}) {
      if (state.menuItems.length) {
        return;
      }
      const items = await menuItemsService.getAll();
      state.menuItems = items;
    },
  },
};
