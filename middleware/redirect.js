export default defineNuxtRouteMiddleware((to, from) => {
  if (to.name === "chatzigiorgis") {
    return navigateTo("/chatzigeorgiou");
  }
});
