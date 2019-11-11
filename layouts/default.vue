<template>
  <div>

    <div class="main">

      <div class="main__header">
        <main-menu></main-menu>
      </div>

      <div class="main__content">

        <search-box></search-box>

        <nuxt-link :class="{isActive: user.auth.success}" class="new-band-btn" to="/auth/upload">
          <i class="la la-plus"></i>
        </nuxt-link>

        <div class="page-content">
          <transition name="fade" mode="out-in">
            <nuxt/>
          </transition>
        </div>

      </div>

    </div>

    <footer class="main__footer">

      <div class="powered-by">
        <!-- <img src="~/assets/img/iparragirre.png" alt="Iparragirre Rock Elkartea"> -->
        <strong>Iparragirre Rock Elkartearen</strong> proiektua
      </div>
      <div class="author">
        Aplikazioaren garapena @asiermusa
      </div>
    </footer>

  </div>
</template>

<script>
import {config} from '~/config'
import {mapState} from 'vuex'
import MainMenu from '~/components/MainMenu.vue'
import SearchBox from '~/components/SearchBox.vue'
import { askForPermissioToReceiveNotifications } from '~/plugins/push.js'

export default {
  components: {
    'main-menu': MainMenu,
    'search-box': SearchBox,
  },
  data(){
    return {
      isOffline: false,
      subStatus: false
    }
  },
  created(){
    window.addEventListener('online', this._networkStatus)
    window.addEventListener('offline', this._networkStatus)
    this._networkStatus()

    // push askForPermissioToReceiveNotificationssetTimeout( () => {
    setTimeout(()=> {
      this._pushNotifications()
    }, 1000)


    // console message
    let styleLog1 = "padding: 5px; background: #7b3772; display: inline-block; color:#ffffff; font-weight: bold; font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif;",
      styleLog2 = styleLog1 + " font-weight: normal; background: #111; color: #fff;",
      styleLog3 = styleLog2 + " display: block; color: #222; background: #fff;"
    console.log("%c#MusikaGidaMorea %cVue.js eta Nuxt bidez egina %cAplikazioaren garapena @asiermusa\n", styleLog1, styleLog2, styleLog3)
  },
  methods: {
    _networkStatus(){
      (navigator.onLine) ? this.isOffline = false : this.isOffline = true;
    },
    async _pushNotifications(){
      let pushStatus = window.localStorage.getItem('__gidamorea-push')
      if(!pushStatus){
        localStorage.setItem('__gidamorea-push', true)
        const getToken = await askForPermissioToReceiveNotifications()
        try {
          let postData = {
            topic: config.pushTopic,
            mode: 'subscribe',
            token: getToken,
          }
          this.$axios.post(config.apiURL + '/firebase', postData).then()
        }
        catch(err) {
          console.log(err)
        }
      }
    }
  },
  computed: {
    ...mapState ({
      user: state => state.users
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/main.scss';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.main {
  display: flex;
  max-width: 1600px;
  position: relative;
  flex-wrap: nowrap;
  flex-direction: column;
  margin: 0 auto;
  padding: 0;
  min-height: calc(100vh - 100px);
  @include from(sm){
    flex-direction: row;
    padding: 0 30px;
  }
  &__search {
    width: auto;
    margin-top: 82px;
    @include from(sm){
      margin: 0;
      padding: 10px 20px;
    }
  }

  &__content {
    display: block;
    width: 100%;
    position: relative;
    background: white;
    padding: 0;
    margin: 82px 0 20px 0;

    @include from(sm) {
      display: flex;
      align-items: flex-start;
      margin: 150px 0 70px 0;
    }

    .page-content {
      width: 100%;
      @include from(sm) {
        width: 72%;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 2px solid rgba(black,.06);
    background: white;
    line-height: 60px;
    padding: 0 20px;
  }

  &__footer {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    background: rgba(black,.03);
    padding: 20px;
    line-height: 16px;
    box-sizing: border-box;
    @include from(sm){
      padding: 20px 30px;
    }

    .powered-by {
      width: calc(100% - 70px);
      font-size: 10px;
      text-align: left;
      @include from(sm){
        font-size: 11px;
      }
      img {
        max-width: 100px;
        opacity: .6;
      }
    }
    .author {
      width: calc(100% - 90px);
      font-size: 9px;
      text-align: left;
      @include from(sm){
        font-size: 10px;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.new-band-btn {
  position: fixed;
  z-index: 999;
  bottom: 10px;
  right: 20px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  text-align: center;
  background: $primary;
  color: white;
  box-shadow: 0 0 20px rgba(black,.2);
  opacity: 0;
  transform: translateY(200px);
  transition: all .2s;
  cursor: pointer;
  &:hover {
    background: white;
    color: $primary;
  }
  &.isActive {
    animation-name: newBandButton;
    animation-duration: 1s;
    animation-delay: .5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
  }
  i:before {
    font-size: 20px;
    line-height: 50px;
  }
}

.v-select .dropdown-toggle {
  background: white !important;
  border: none;
  height: 50px;
  border: 2px solid rgba(black,.06);
}

.v-select .dropdown-menu {
  border: none;
}

.v-select .selected-tag {
  line-height: 36px;
}

@keyframes newBandButton {
  0% {
    opacity: 0;
    transform: translateY(200px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
}
</style>
