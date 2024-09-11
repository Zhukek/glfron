export const useHeaderStateStore = defineStore("headerState", {
  state: () => ({
    isColorWhite: false,
    isLogoShow: true,
    canHeaderChange: false,
    isOpen: false,
  }),
  getters: {
    getIsColorWhite: (state) => state.isColorWhite,
    getIsLogoShow: (state) => state.isLogoShow,
    getCanHeaderChange: (state) => state.canHeaderChange,
    getIsOpen: (state) => state.isOpen,
  },
  actions: {
    openHeader() {
      this.isOpen = true;
    },
    closeHeader() {
      this.isOpen = false;
    },
    changeCanHeaderChange(can) {
      this.canHeaderChange = can;
    },
    changeLogoShow(isShow) {
      this.isLogoShow = isShow;
    },
    changeColorToWhite(isWhite) {
      this.isColorWhite = isWhite;
    },
  },
});
