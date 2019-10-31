<template>
  <div class="main-content">

    <h2>Talde berria igo</h2>

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      message="Taldearen datuak ondo gorde dira.">
    </message>

    <bandform
      :loaderStatus="loaderStatus"
      :currentUser="myUser"
      :band="band"
      mode="upload"
      @clicked="_uploadForm">
    </bandform>

  </div>
</template>

<script>
import axios from 'axios'
import {config} from '@/config'
import message from '@/components/Messages'
import bandform from '@/components/auth/BandForm'

export default {
  middleware: 'auth',
  components: {
    bandform,
    message
  },
  head () {
    return {
      title: 'Talde berria igo - ' + config.title
    }
  },
  async asyncData ({ params }) {
      let userInfo = await axios.get(config.apiURL + '/user-info')
      return {
        myUser: userInfo.data.user
      }
  },
  data() {
    return {
      loaderStatus: false,
      band: {
        members: 1,
        women: 1
      }, // TODO: set band women/member values to 1 by default...
      messages: {
        group: 'upload',
        type: null,
        errors: []
      }
    }
  },
  methods: {
    _uploadForm(e) {

      var form = document.getElementById('form');
      var formData = new FormData(form);

      if(e[0] !== null || e[0] !== 'undefined')
        formData.append('user', e[0])

      if(this.band.country)
        formData.append('country', this.band.country.value)

      this.messages.errors=[]

      if (e[0] == null || e[0] == 'undefined')
        this.messages.errors.push("Erabiltzaile bat aukeratu behar duzu.")

      if(!e[1])
        this.messages.errors.push("Irudia igotzea beharrezkoa da.")

      if(e[1] && e[1].size > 1000000)
        this.messages.errors.push("Irudiaren tamaina handiegia da. Max: 1Mb")

      if(e[2] < 400)
        this.messages.errors.push("Irudiaren zabalera txikiegia da.")

      if (!this.band.name)
        this.messages.errors.push("Taldearen izena.")

      if (!this.band.music)
        this.messages.errors.push("Musika estiloa.")

      if (!this.band.country)
        this.messages.errors.push("Taldearen herrialdea.")

      if (!this.band.members)
        this.messages.errors.push("Taldekide kopurua.")

      if (!this.band.women)
        this.messages.errors.push("Emakume kopurua.")

      if (!this.band.women)
        this.messages.errors.push("Emakume kopurua.")

      if (this.band.members && this.band.women && this.band.women > this.band.members){
        this.messages.errors.push("Emakume kopurua ezin da taldekide kopurua baino handiago izan.")
      }

      if(!this.messages.errors.length){
        this.loaderStatus = true

          this.$axios.post(config.apiURL + '/upload',
            formData)
            .then(response => {
              //handle success
              this.band = response.data.band
              this.$router.push('/auth/added/' + this.band.slug)
              this.loaderStatus = false
            })
            .catch(err => {
              this.loaderStatus = false
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

</style>
