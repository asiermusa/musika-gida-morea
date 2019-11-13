<template>
  <div class="main-content">

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Bidalita!"
      message="Emaila ondo bidali da.">
    </message>

    <div class="flexbox-layout band content">
      <div class="flexbox-layout__col1 col1">

        <h2>Emailez zabaldu Musika Gida Morea</h2>

        <div class="content__desc">
          Bidali iezaiozu talde bat edo gehiagoren informazioa nahi duzunari:
          Jai batzorde, kontzertu antolatzaile... edo beste edonorri. Badaezpada
          esaiozu SPAM karpetan ikusteko emaila heldu dela ziurtatzeko.
        </div>

        <div class="content__desc">
          Emailez bidali nahi dituzun taldeak aukeratu beheko zerrendatik:
        </div>

        <input type="text" v-model="search" placeholder="Taldeen artean bilatu...">
        <form action="">
          <ul class="checkbox-container">
            <li v-for="band in mailingBands">
              <label class="checkbox-label">

                <input type="checkbox" :value="band" v-model="checkedBands">
                <span class="checkbox-label__text">{{ band.name }}</span>
                <span class="checkmark"></span>
              </label>
            </li>
          </ul>

          <div class="content__title">
            Datuak bete
          </div>

          <div class="content__desc">
            Emaila nori bidali nahi diozun, azalpen txiki bat...
          </div>

          <input type="email" v-model="email" placeholder="Hartzailearen emaila">
          <input type="text" v-model="subject" placeholder="Gaia">
          <textarea v-model="emailContent" rows="4" cols="80" placeholder="Azalpen txiki bat"></textarea>
          <button @click.prevent="_sendEmail()" class="submit">
            <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
            <span v-else>Emaila bidali</span>
          </button>

        </form>
      </div>

      <div class="flexbox-layout__col2 col2">

        <div class="band__icons">
          <i class="la la-envelope"></i>
            <span class="band__icons--text">
              Guztira bidalitako emailak: <span class="band__icons--title"> {{ totalEmails }} </span>
            </span>
        </div>

        <div class="selected-bands">
          <h3>Aukeratutako taldeak</h3>
          <ul v-if="checkedBands.length > 0">
            <li v-for="band in checkedBands">
              {{band.name}}
            </li>
          </ul>
          <p v-else>Ez duzu talderik aukeratu oraindik</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {config} from '@/config'
import {mapState} from 'vuex'
import message from '@/components/Messages'
export default{
  components: {
    message
  },
  head () {
    return {
      title: 'Emaila bidali - ' + config.title
    }
  },
  asyncData ({ params }) {
    return axios.get(config.apiURL + '/user-info')
    .then((res) => {
      return { myUser: res.data.user }
    })
  },
  data(){
    return {
      config,
      email: '',
      subject: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      emailContent: null,
      loaderStatus: false,
      bands: [],
      checkedBands: [],
      search: '',
      totalEmails: null,
      messages: {
        group: 'send-email',
        type: null,
        errors: []
      }
    }
  },
  created(){
    let params = {
      limit: 0
    }
    this.$axios.get(config.apiURL + '/bands-no-pagination', {params})
      .then(response => {
        this.bands = response.data.bands
      })

    params = {
      user: this.myUser.username
    }
    this.$axios.get(config.apiURL + '/get-emails', {params})
      .then(response => {
        this.totalEmails = response.data.emails.length
      })

  },
  watch: {
    // whenever question changes, this function will run
    emailContent: function (n, o) {
    }
  },
  computed: {
    mailingBands(){
      return this.bands.filter((band) => {
        if(band.name)
          return band.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
  methods: {
    _sendEmail(){
      this.messages.errors=[]

      if (!this.email || !this.emailContent){
        this.messages.errors.push("Emaila eta edukia beharrezkoak dira.")
      }

      if (this._isEmailValid(this.email) == 'has-error'){
        this.messages.errors.push("Email helbidea ez da zuzena.")
      }

      if (this.checkedBands.length < 1 ){
        this.messages.errors.push("Gutxienez talde bat aukeratu behar duzu.")
      }

      if(!this.messages.errors.length){
        this.loaderStatus = true
        let postData = {
          user: this.myUser.username,
          email: this.email,
          subject: this.subject,
          content: this.emailContent,
          bands: this.checkedBands,
          serverURL: config.serverURL + '/'
        }
        this.$axios.post(config.apiURL + '/send-email', postData)
          .then(response => {
            this.loaderStatus = false
            this._message('success')
            this.emailContent = ''
            this.checkedBands = []
            this.subject = ''
            this.email = ''
            // sum total emails number
            this.totalEmails ++
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
    },
    _isEmailValid(e) {
      return (e == "")? "" : (this.reg.test(e)) ? 'has-success' : 'has-error';
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~/assets/scss/main.scss';

.band {
  .col1 {
    order: 2
  }
  .col2 {
    order: 1
  }
  h2 {
    margin-top: 30px;
  }
  @include from(sm){
    .col1 {
      order: 1
    }
    .col2 {
      order: 2
    }
    h2 {
      margin-top: 0;
    }
  }

  &__icons {
    border: 2px solid rgba(black,.06);
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    width: 100%;
    &--text {
      margin-top: 3px;
    }
    &--title {
      font-weight: bold;
      margin: 0 0 0 3px;
    }
    i {
      &:before {
        font-size: 26px;
        margin-right: 5px;
      }
    }
  }
}

.selected-bands {
  h3 {
    margin-bottom: 10px;
    color: white;
    font-size: 14px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(white,.1);
  }
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 110px;
  padding: 15px;
  border-radius: 4px;
  color: white;
  background-image: linear-gradient(30deg, lighten(black, 20%), lighten(black, 40%));
  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 5px;
    &:before {
      position: absolute;
      font-family: 'LineAwesome';
      content: '\f17b';
      left: 0;
    }
  }
}

/* Customize the label (the container) */
.checkbox-container{
  max-height: 200px;
  overflow-y: auto;
  padding: 10px 0;
  margin: 0;
  background-image: linear-gradient(30deg, rgba(black,.06), transparent);
  border-radius: 4px;
  padding: 6px;
  .checkbox-label {
    display: block;
    position: relative;
    padding: 5px;
    margin-bottom: 2px;
    cursor: pointer;
    font-size: 13px;
    color: black;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 0;
      transition: all .3s;
    }
    /* On mouse-over, add a grey background color */
    &:hover input ~ .checkmark {
      //background-color: #ccc;
    }
    /* When the checkbox is checked, add a blue background */
    & input:checked {
      & ~ .checkbox-label__text {
        color: white;
        z-index: 2;
        position: relative;
      }
      & ~ .checkmark {
        background: $primary;
        border-radius: 2px;
      }
    }
  }
}
</style>
