<template>
  <div class="main-content">

    <h2>Taldea aldatu</h2>

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Gordeta!"
      message="Taldearen datuak ondo gorde dira.">
    </message>

    <bandform
      :loaderStatus="loaderStatus"
      :band="band"
      :currentUser="myUser"
      mode="update"
      @clicked="_updateForm">
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
      title: 'Taldea aldatu - ' + config.title
    }
  },
  async asyncData ({ params }) {
    try {
      let userInfo = await axios.get(config.apiURL + '/user-info')
      let bandInfo = await axios.get(config.apiURL + '/get-band-id/' + params.id)
      return {
        myUser: userInfo.data.user,
        band: bandInfo.data.band
      }
    } catch(err) {
    }
  },
  data() {
    return {
      loaderStatus: false,
      messages: {
        group: 'update',
        type: null,
        errors: []
      }
    }
  },
  methods: {
    _updateForm(e) {
      let form = document.getElementById('form');
      let formData = new FormData(form);

      formData.append('id', this.$route.params.id)

      if(e[0] !== null || e[0] !== 'undefined')
        formData.append('user', e[0])

      if(this.band.country)
        formData.append('country', this.band.country.value)

      this.messages.errors=[]

      if (e[0] == null || e[0] == 'undefined')
        this.messages.errors.push("Erabiltzaile bat aukeratu behar duzu.")

      if(!this.band.picture){
        if(!e[1])
          this.messages.errors.push("Irudia igotzea beharrezkoa da.")

        if(e[1] && e[1].size > 1000000)
          this.messages.errors.push("Irudiaren tamaina handiegia da.")
      }

      if(e[2] < 400)
        this.messages.errors.push("Irudiaren zabalera txikiegia da.")

      if (!this.band.music)
        this.messages.errors.push("Musika estiloa.")

      if (!this.band.country || this.band.country == null )
        this.messages.errors.push("Taldearen herrialdea.")

      if (!this.band.town)
        this.messages.errors.push("Taldearen herria.")

      if (!this.band.members)
        this.messages.errors.push("Taldekide kopurua.")

      if (!this.band.women)
        this.messages.errors.push("Emakume kopurua.")

      if (this.band.members && this.band.women && this.band.women > this.band.members){
        this.messages.errors.push("Emakume kopurua ezin da taldekide kopurua baino handiago izan.")
      }

      if(!this.messages.errors.length){
        this.loaderStatus = true
          axios.put(config.apiURL + '/update', formData)
            .then(response => {
              this.loaderStatus = false
              this._message('success')
            })
            .catch(err => {
              //handle error
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
          duration: 5000,
        })
      }, 100)
    }
  }
}
</script>
