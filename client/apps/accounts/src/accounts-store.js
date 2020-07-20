export const accountsStore = {
  namespace: 'accounts',
  state: {
    accounts: [],
  },
  actions: {
    async getAccounts({state}, {accountsService}) {
      const accounts = await accountsService.getAll();
      state.accounts = accounts;
    },
  },
};
