<template>
  <div>
    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Aurrera!"
      message="Informazioa ondo bidali da">
    </message>


    <div class="band-change">
      <h3><i class="la la-warning"></i> ADI</h3>
      <div class="content__title">
        Talde honen informazioa aldatu nahi?
      </div>
      <div class="content__desc">

        {{ band.name }} taldearen fitxa jadanik datu-basean dagoen arren,
        zure ekarpenak egin ditzakezu. Azpiko formularioan aldaketaren bat proposatu
        dezakezu.

        <nuxt-link class="band-change__link" :to="'/bands/' + band.slug">
          <i class="la la-external-link"></i> {{ band.name }} taldearen fitxa ikusi
        </nuxt-link>

      </div>
      <textarea name="change" rows="4" cols="80" v-model="emailContent"></textarea>
  </div>
    <button @click.prevent="_sendEmail()" class="submit">
      <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
      <span v-else>Informazioa helarazi</span>
    </button>

  </div>
</template>

<script>
import {config} from '@/config'
export default {
    name: 'SendChangesEmail',
    props: [
      'band',
      'user'
    ],
    data(){
      return{
        loaderStatus: false,
        emailContent: '',
        messages: {
          group: 'send-changes-email',
          type: null,
          errors: []
        }
      }
    },
    methods: {
      _sendEmail(){
        this.messages.errors=[]

        if (!this.emailContent){
          this.messages.errors.push("Aldaketaren bat proposatu gutxinez.")
        }

        if(!this.messages.errors.length){
          this.loaderStatus = true
          let postData = {
            content: this.emailContent,
            user: this.user,
            band: this.band.name
          }

          this.$axios.post(config.apiURL + '/send-changes-email', postData)
            .then(response => {
              this.loaderStatus = false
              this._message('success')
              this.emailContent = ''
            })
          }else{
            this._message('warn')
          }
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
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.band-change {
  padding: 30px 10px;
  background: rgba(black,.05);
  border-top: 2px solid rgba(black,.1);
  border-bottom: 2px solid rgba(black,.1);
  font-size: 16px;
  margin-bottom: 30px;
  transition: all .3s;
  i:before {
    font-size: 20px;
  }
  &__link {
    display: block;
    font-weight: bold;
    margin-top: 20px;
    &:hover{
      text-decoration: underline;
    }
  }
}

</style>
