export const cardsStore = {
  namespace: 'cards',
  state: {
    cards: [],
  },
  actions: {
    async getCards({state}, {cardsService}) {
      const cards = await cardsService.getAll();
      state.cards = cards;
    },
  },
};
