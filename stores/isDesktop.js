export const useIsDesktopStore = defineStore("isDesktop", {
  state: () => ({
    isDesktop: true,
  }),
  getters: {
    getIsDesktop: (state) => state.isDesktop,
  },
  actions: {
    changeIsDesktop(isDesktop) {
      this.isDesktop = isDesktop;
    },
  },
});
