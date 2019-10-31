<template>
  <div class="main-content login">

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      message="Saioa ondo hasi duzu">
    </message>

    <div class="login__social">
      <a href="#" class="login__btn login__btn login__btn-google" @click="_handleSocial('google')">
        <img src="@/assets/img/google.png" alt="Google bidez"> Google bidez saioa hasi
      </a>
    </div>

    <form class="login__form" method="post" @submit.prevent="_login()">
      <div class="content__desc">Edo zure erabiltzaile eta pasahitza erabiliz sartu zaitezke.</div>
      <input type="text" name="username" v-model="username" placeholder="Emaila">
      <input type="password" name="password" v-model="password" placeholder="Pasahitza">
      <button  type="submit" class="submit">
        <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
        <span v-else>Saioa hasi</span>
      </button>
    </form>

    <nuxt-link to="/password" class="login__password">
      Pasahitza ahaztu duzu? Egin klik hemen berria eskatzeko.
    </nuxt-link>

  </div>
</template>

<script>
import {config} from '@/config'
import message from '@/components/Messages'
export default {
  name: 'Login',
  head () {
    return {
      title: 'Saioa hasi - ' + config.title
    }
  },
  data() {
    return {
      username: null,
      password: null,
      loaderStatus: false,
      config,
      windowLocation: '',
      messages: {
        group: 'update',
        type: null,
        errors: []
      },
      env: null
    }
  },
  mounted () {
    window.addEventListener('message', this._onMessage, false)
    this.url = window.location.href
  },
  beforeDestroy () {
    window.removeEventListener('message', this._onMessage)
  },
  methods: {
    _handleSocial(provider){
      const newWindow = this._openWindow(config.apiURL + '/auth/' + provider, 'message')
    },
    _login() {
      this.loaderStatus = true
      this.messages.errors=[]

      let postData = {
        username: this.username,
        password: this.password
      }

      //TODO: Min passowrd length

      this.$store.dispatch('users/loginUserAction', postData).then(res => {
        this.$router.push('auth/update')
        this.loaderStatus = false
      })
      .catch(err => {
        this.messages.errors.push('Erabiltzaile izen edo pasahitz okerra')
        this._message('warn')
        this.loaderStatus = false
      })
    },
    _message(type){
      this.messages.type = type
      setTimeout(() => {
        this.$notify({
          group: this.messages.group,
          type: type,
          duration: 3000,
        })
      }, 100)
    },
    _onMessage (e) {
      //if e.origin !== window.origin
      // console.log('e', e)
      // console.log('server', config.serverURL)
      if (e.origin + config.backendCallbackSLUG !== config.serverURL || !e.data.token) {
        return
      }

      let data = {
        token: e.data.token,
        user: e.data.user,
        picture: e.data.picture,
        success: true
      }

      this.$store.dispatch('users/socialLoginUserAction', data)
      this.$router.push('auth/update')
    },
    _openWindow (url, title, options = {}) {
      if (typeof url === 'object') {
        options = url
        url = ''
      }

      options = { url, title, width: 600, height: 720, ...options }

      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
      const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
      const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height

      options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
      options.top = ((height / 2) - (options.height / 2)) + dualScreenTop

      const optionsStr = Object.keys(options).reduce((acc, key) => {
        acc.push(`${key}=${options[key]}`)
        return acc
      }, []).join(',')

      const newWindow = window.open(url, title, optionsStr)

      if (window.focus) {
        newWindow.focus()
      }

      return newWindow
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~/assets/scss/main.scss';

.login {
  width: 100%;
  margin: 0 auto;

  @include from(md){
    width: 60%;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    &-twitter {
      color: #1da1f2;
      &:focus {
        border-color: #1da1f2;
      }
    }
    &-google {
      &:focus {
        border-color: #333333;
        background: #f8f8f8;
      }
      &:hover {
        background: #f8f8f8;
      }
    }

    img, i {
      max-width: 20px;
      margin: 0 10px;
      line-height: 15px;
    }
    i:before {
      font-size: 25px;
    }
  }

  &__form {
    text-align: center;
  }

  &__social{
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid rgba(black,.06);
    padding-bottom: 20px;
    margin-bottom: 30px;
  }

  &__password {
    display: block;
    margin: 30px 0;
    text-align: center;
    text-decoration: underline;
  }
}
</style>
