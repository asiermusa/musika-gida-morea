<template>
  <div class="main-content password-forgotten">

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Bidalita!"
      message="Email bat bidali dizugu pasahitza berrezartzeko argibideekin.">
    </message>

    <h2>Pasahitza galdu duzu?</h2>

    <div class="content__desc">
      Zure pasahitza berrezartzeko eman zure emaila eta argibideak jasoko dituzu emandako helbidean.
    </div>

    <form class="password-forgotten__form" action="index.html" method="post" @submit.prevent="_passwordReset()">
      <input type="email" name="email" v-model="passwordResetEmail" placeholder="Zure emaila">
      <button  type="submit" class="submit">
        <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
        <span v-else>Pasahitza berrezarri</span>
      </button>
    </form>

  </div>
</template>

<script>
import {config} from '@/config'
import message from '@/components/Messages'
export default {
  name: 'Password',
  head () {
    return {
      title: 'Pasahitza galdu duzu? - ' + config.title
    }
  },
  data() {
    return {
      passwordResetEmail: null,
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
      let postData = {
        email: this.passwordResetEmail
      }

      this.loaderStatus = true
      this.messages.errors=[]

      this.$axios.post(config.apiURL + '/forgot', postData)
        .then(user => {
          this.loaderStatus = false
          this._message('success')
        })
        .catch(err => {
          this.loaderStatus = false
          this.messages.errors.push('Ezin izan da emaila bidali')
          this._message('warn')
        })
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

.password-forgotten {
  width: 100%;
  margin: 0 auto;
  @include from(md){
    width: 60%;
  }
}
</style>
