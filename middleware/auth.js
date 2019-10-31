export default ({ store, route, redirect }) => {
  // Check if user is connected first
  //https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
  if (!store.getters['users/user'].success && process.client) return redirect('/')
}
