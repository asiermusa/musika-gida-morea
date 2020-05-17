<template>
  <div class="main-content">

    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Bidalita!"
      message="Push jakinazpena ondo bidali da.">
    </message>

    <div class="flexbox-layout band content">
      <div class="flexbox-layout__col1 col1">

        <h2>Ezarpenak</h2>

        <div v-if="currentUser.role == 'administrator'">
          <div class="content__title">Jakinarazpen berria bidali</div>
          <div class="content__desc">
            Jakinarazpena bidaltzeko gai konkretu baera bidali behar da.
          </div>

          <input type="text" v-model="push.topic" placeholder="Jakinarazpenaren gaia">

          <div class="content__desc">
            Jakinarazpenean bistaratuko diren eremuak:
          </div>

          <input type="text" v-model="push.title" placeholder="Izenburua">
          <textarea v-model="push.content" rows="4" cols="80" placeholder="Textua"></textarea>
          <input type="text" v-model="push.link" placeholder="Klik egiterakoan lotura">
          <input type="text" v-model="push.image" placeholder="Irudiaren URLa (https bidez)">
          <input type="text" v-model="push.icon" value="https://musikagidamorea.eus/push.png" placeholder="Ikonoa (https bidez)">
          <div class="notes">
            Defektuz erabili honako ikonoa: <br>
            <strong>https://musikagidamorea.eus/push.png</strong>
          </div>
          <button @click.prevent="_sendPush()" class="submit">
            <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
            <span v-else>Jakinarazpena bidali</span>
          </button>

        </div>

      </div>

      <div class="flexbox-layout__col2 col2">
        <img class="push-image" src="~/assets/img/push-image.png" alt="Gida Morea">
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {config} from '@/config'
import { askForPermissioToReceiveNotifications } from '~/plugins/push.js'
import message from '@/components/Messages'

export default{
  middleware: 'auth',
  components: {
    message
  },
  head () {
    return {
      title: 'Ezarpenak - ' + config.title
    }
  },
  data(){
    return {
      config,
      loaderStatus: false,
      push: {
        topic: '',
        title: '',
        content: '',
        link: '',
        image: '',
        icon: ''
      },
      messages: {
        group: 'send-email',
        type: null,
        errors: []
      }
    }
  },
  async asyncData ({ params }) {
    try {
      let userInfo = await axios.get(config.apiURL + '/user-info')
      return {
        currentUser: userInfo.data.user
      }
    } catch(err) {
      console.log('error', err)
    }
  },
  mounted(){
    if(this.currentUser.role != 'administrator') this.$router.push('/')
  },
  methods: {
    _sendPush(){
      this.messages.errors=[]

      if (!this.push.topic){
        this.messages.errors.push("Gaia beharrezkoa da.")
      }

      if (!this.push.title){
        this.messages.errors.push("Izenburua beharrezkoa da.")
      }

      if (!this.push.content){
        this.messages.errors.push("Edukia beharrezkoa da.")
      }

      if (!this.push.icon){
        this.messages.errors.push("Ikonoa beharrezkoa da.")
      }

      if(!this.messages.errors.length){

        this.loaderStatus = true

        let postData = {
          topic: this.push.topic,
          title: this.push.title,
          content: this.push.content,
          link: this.push.link,
          image: this.push.image,
          icon: this.push.icon
        }
        setTimeout(()=> {


        this.$axios.post(config.apiURL + '/send-push', postData)
          .then(res => {
            this._message('success')
            this.loaderStatus = false
          })
          .catch(err => {
            this.loaderStatus = false
          })

        }, 500)

      }else{
        this._message('warn')
        this.loaderStatus = false
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
  }
}
</script>

<style lang="scss" scoped>

@import '~/assets/scss/main.scss';

.notes {
  background: #f2f2f2;
  color: #444;
  font-size: 9px;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.push-image {
  margin: 60px 0 0 0;
  max-width: 100%;
}
// the switcher css$
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: block;
  width: 40px;
  height: 20px;
  margin-left: 0;
  margin-top: 5px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.switcher {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($primary,.15);
  transition: .2s;
}

.switcher:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .2s;
}

input:checked + .switcher {
  background-color: rgba($primary,1);
  &.switcher:before {
    background-color: white;
  }
}

input:focus + .switcher {
  box-shadow: 0 0 1px rgba(black,.1);
}

input:checked + .switcher:before {
  transform: translateX(20px);
}

/* Rounded sliders */
.switcher.round {
  border-radius: 20px;
}

.switcher.round:before {
  border-radius: 50%;
}
</style>
