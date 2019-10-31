<template>
  <div class="main-content register">

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Aupa!"
      message="Zure erabiltzailea ondo sortu da. Email bat bidali dizugu argibideekin.">
    </message>

    <div v-if="this.$route.params.token">

      <div class="register__icon"><i class="la la-check"></i></div>
      <div class="register__active-title">Zure erabiltzailea aktibatu da</div>
      <div class="register__active-desc">Orain bai, zure lehen taldearen informazioa igo dezakezu.
        <router-link class="bands__link" :to="{name: 'login'}">
          </i> Saioa hasi!
        </router-link>
      </div>

    </div>

    <div v-else>

      <h2>Eman izena!</h2>

      <div class="content__desc">
        <strong>Google</strong> bidez izena emateko, zoaz zuzenean saioa hastera. Ez duzu beste ezer bete beharrik!<br><br>
        Email bidez izena emateko bete beheko formularioa eta emandako emailean jasoko duzu kontua
        aktibatzeko lotura bat.</div>
      <form class="" method="post" @submit.prevent="_register()">
        <input type="text" name="username" v-model="username" placeholder="Emaila">
        <input type="password" name="password" v-model="password" placeholder="Pasahitza">
        <input type="password" name="repeat-password" v-model="repeatPassword" placeholder="Errepikatu pasahitza">
        <button  type="submit" class="submit">
          <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
          <span v-else>Izena eman</span>
        </button>
      </form>
    </div>

  </div>
</template>

<script>
import {config} from '@/config'
import message from '@/components/Messages'

export default {
  name: 'Register',
  head () {
    return {
      title: 'Izena eman - ' + config.title
    }
  },
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      token: null,
      id: null,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      loaderStatus: false,
      messages: {
        group: 'update',
        type: null,
        errors: []
      }
    }
  },
  created(){
    if(this.$route.params.token){
      this.id = this.$route.params.id
      this.token = this.$route.params.token
      this._completRegistration()
    }
  },
  methods: {
    _register() {
      this.loaderStatus = true
      this.messages.errors = []

      if(this.password != this.repeatPassword)
        this.messages.errors.push('Pasahitzak ez datoz bat.')

      if(this.reg.test(this.username) == false)
        this.messages.errors.push('Emaila ez da zuzena.')

      if(this.password.length < 6)
        this.messages.errors.push('Pasahitzak gutxienez 6 karaktere izan behar ditu.')

      if(!this.messages.errors.length){

        let postData = {
          username: this.username,
          password: this.password
        }

        this.$store.dispatch('users/registerUserAction', postData).then(res => {
          this._message('success')
          this.loaderStatus = false
        })
        .catch(err => {
          this.messages.errors.push('Email hau existitzen da jadanik.')
          this._message('warn')
          this.loaderStatus = false
        })

      }else{
        this.loaderStatus = false
        this._message('warn')
      }
    },
    _completRegistration(){
      let postData = {id: this.id}
      this.$store.dispatch('users/completRegistration', postData)
    },
    _message(type){
      this.messages.type = type
      setTimeout(() => {
        this.$notify({
          group: this.messages.group,
          type: type,
          duration: 5000,
        })
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.register {
  width: 100%;
  margin: 0 auto;

  @include from(md){
    width: 60%;
  }
  &__icon {
    text-align: center;
    margin: 30px 0;
    i:before {
      font-size: 50px;
    }
  }
  &__active-title {
    font-size: 20px;
    @include from(sm){
      font-size: 25px;
    }
  }
  &__active-desc {
    margin: 30px 0;
    font-size: 14px;
    a {
      text-decoration: underline;
    }
  }
}
</style>
