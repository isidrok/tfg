export const accountsStore = {
  namespace: 'accounts',
  state: {
    accounts: [],
    movements: [],
  },
  actions: {
    async getAccounts({state}, {accountsService}) {
      const accounts = await accountsService.getAll();
      state.accounts = accounts;
    },
  },
};
