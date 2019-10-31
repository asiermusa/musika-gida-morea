<template>
  <div class="main-content register">

    <div v-if="completRegistration">
      <div class="register__icon"><i class="la la-check"></i></div>
      <div class="register__active-title">Zure erabiltzailea aktibatu da</div>
      <div class="register__active-desc">Orain bai, zure lehen taldearen informazioa igo dezakezu.
        <router-link class="bands__link" :to="{name: 'login'}">
          </i> Saioa hasi!
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Complete',
  head () {
    return {
      title: 'Erabiltzailea aktibatu - ' + config.title
    }
  },
  data(){
    return {
      token: null,
      completRegistration: false
    }
  },
  created(){
    if(this.$route.params.token){
      this.token = this.$route.params.token
      this._completRegistration()
    }
  },
  methods: {
    _completRegistration(){
      let params = { token: this.token }
      if(this.token) {
        this.$store.dispatch('users/completRegistration', params)
        .then(res => {
          this.completRegistration = true
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~/assets/scss/main.scss';

.register {
  width: 100%;
  margin: 0 auto;
  text-align: center;

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
