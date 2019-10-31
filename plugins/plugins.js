import Vue from 'vue'
import Loader from '@/components/Loader'
import Messages from '@/components/Messages'
import vSelect from 'vue-select'
import Gravatar from 'vue-gravatar'
import InfiniteScroll from 'vue-infinite-scroll'
import Notifications from 'vue-notification'
import draggable from 'vuedraggable'
import { VLazyImagePlugin } from 'v-lazy-image'
import VueWindowSize from 'vue-window-size'

import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/analytics'

Vue.component('v-select', vSelect)
Vue.component('loader', Loader)
Vue.component('message', Messages)
Vue.component('v-gravatar', Gravatar)
Vue.component('draggable', draggable)

Vue.use(Notifications)
Vue.use(InfiniteScroll)
Vue.use(VLazyImagePlugin)
Vue.use(VueWindowSize)

import utils from '@/utils/utils'
Vue.mixin({
	methods: {
		_regions(e) {
      return utils._regions(e)
    },
		_bands(e){
			return utils._bands(e)
		}
	}
})

var firebaseConfig = {
  apiKey: "AIzaSyCPUrQXh-jWEH2Wm3gtYgA0RGeE7MF5RQ8",
  authDomain: "musikagidamorea-41dc4.firebaseapp.com",
  databaseURL: "https://musikagidamorea-41dc4.firebaseio.com",
  projectId: "musikagidamorea-41dc4",
  storageBucket: "musikagidamorea-41dc4.appspot.com",
  messagingSenderId: "62092548298",
  appId: "1:62092548298:web:b1c6a3e2fd76bb5284bc33",
  measurementId: "G-Q04J3NZPPQ"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
