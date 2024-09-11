export const useIsPopupOpen = defineStore("isPopupOpen", {
  state: () => ({
    isPopupOpen: false,
  }),
  getters: {
    getIsPopupOpen: (state) => state.isPopupOpen,
  },
  actions: {
    changeIsPopupOpen(isOpen) {
      this.isPopupOpen = isOpen;
    },
  },
});
