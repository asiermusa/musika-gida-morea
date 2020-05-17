export default function ({ $axios, store, redirect }) {
  $axios.onError(error => {
    if(error.response.status === 401) {
      if(error.response) {
				if(error.response.status == 401) { // Session expired.
						store.dispatch('users/logoutUserAction')
				}
  		}
    }
  })
}
