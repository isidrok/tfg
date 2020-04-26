export const accountsStore = {
    namespace: 'accounts',
    state: {
        accounts: [],
        movements: []
    },
    mutations: {
        setAccounts(state, { accounts }) {
            state.accounts = accounts;
        }
    },
    actions: {
        async getAccounts({ mutations, state }, { accountsService }) {
            const accounts = await accountsService.getAll();
            mutations.setAccounts.exec({accounts});
        }
    }
}