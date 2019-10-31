<template>
  <div class="main-content password-forgotten">

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Egina!"
      message="Zure pasahitza ondo aldatu da.">
    </message>

    <h1>Pasahitza aldatu</h1>
    <div class="content__desc">Zure pasahitza aldatzeko aukeratu berri bat hemen:</div>
    <form class="" method="post" @submit.prevent="_passwordReset()">
      <input type="password" name="newPassword" v-model="newPassword" placeholder="Pasahitza berria">
      <input type="password" name="confirmPassword" v-model="confirmPassword" placeholder="Pasahitz berria baieztatu">

      <button  type="submit" class="submit">
        <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
        <span v-else>Pasahitza aldatu</span>
      </button>

    </form>

  </div>
</template>

<script>
import {config} from '@/config'
import message from '@/components/Messages'
export default {
  head () {
    return {
      title: 'Pasahitza berrezarri - ' + config.title
    }
  },
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      loaderStatus: false,
      messages: {
        group: 'update',
        type: null,
        errors: []
      }
    }
  },
  methods: {
    _passwordReset() {

      this.loaderStatus = true
      this.messages.errors = []

      if(this.newPassword != this.confirmPassword)
        this.messages.errors.push('Pasahitzak ez datoz bat.')

      if(this.newPassword.length < 6)
        this.messages.errors.push('Pasahitzak gutxienez 6 karaktere izan behar ditu.')

      if(!this.messages.errors.length){

        let postData = {
          newPassword: this.newPassword,
          token: this.$route.params.token
        }

        this.$axios.post(config.apiURL + '/reset', postData)
          .then(user => {
            this._message('success')
            this.loaderStatus = false
          })
          .catch(err => {
            this.messages.errors.push('Ezin da pasahitza aldatu.')
            this._message('warn')
            this.loaderStatus = false
          })
      }else{
        this.loaderStatus = false
        this._message('warn')
      }
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

<style lang="scss">

@import '~/assets/scss/main.scss';

.password-forgotten {
  width: 100%;
  margin: 0 auto;
  @include from(md){
    width: 60%;
  }
}
</style>
