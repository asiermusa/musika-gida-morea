<template>
  <div>

    <!-- exclusive administrator view -->
    <div class="admin" v-if="currentUser.role == 'administrator'">
      Kudeaketa panela
      <div class="admin__desc">
        Talde honen informazioa <strong>{{ user }}</strong> egileak kudeatzen du.
        Aldatzeko, beheko zerrendatik aukeratu berri bat.
      </div>

      <v-select
        v-model="selectedUser"
        :options="listUsers"
        @input="_changeUser">
      </v-select>

      <div class="admin__status">
        <strong>Bidalketaren egoera</strong>
        <label class="switch">
          <input type="checkbox" name="status" value="publish" v-model="band.status">
          <span class="switcher round"></span>
        </label>
      </div>

    </div>

    <div v-else>
      <input type="hidden" v-model="band.status" name="status">
    </div>
    <!-- exclusive administrator view -->

  </div>
</template>

<script>
import {config} from '@/config'
export default {
  name: 'AdminView',
  props: [
    'currentUser',
    'band'
  ],
  data(){
    return{
      user: '',
      selectedUser: '',
      listUsers: []
    }
  },
  created(){
    this._getUsers()
    this._getUser()
  },
  methods: {
    //change user event (emit to the parent component)
    _changeUser(e){
      if(e !== null) {
        this.band.user = this.selectedUser.value
        this.user = this.selectedUser.label
      }
    },
    //get list of active users (all users)
    _getUsers() {
      this.$axios.get(config.apiURL + '/users', {
        params: {
          userActive: true
        }
      }).then(res => {
          res.data.users.forEach(user => {
            this.listUsers.push({label:user.username, value:user._id})
          })
        })
        .catch(error => {
          //this.$router.push('/')
        })
    },
    //get the user who created band info (NO current connected)
    _getUser(){
      if(this.band.user){
        this.$axios.get(config.apiURL + '/users', {
          params: {
            user: this.band.user,
            userActive: true
          }
        }).then(res => {
            this.user = res.data.users[0].username
            this.selectedUser = {label:res.data.users[0].username, value:res.data.users[0]._id}
          })
          .catch(error => {
            //this.$router.push('/')
          })
      }else{
        this.selectedUser = {label:this.currentUser.username, value:this.currentUser._id}
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/main.scss';

.admin {
  background: $primary;
  color: white;
  padding: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  border-radius: 4px;

  &__desc {
    font-weight: normal;
    color: lighten($primary,25%);
    font-size: 13px;
    margin: 15px 0;
  }

  &__status {
    display: flex;
    align-items: center;
    color: white;
    font-size: 13px;
    margin: 15px 0;
    font-weight: normal;
    border-top: 2px solid rgba(white,.1);
    padding-top: 15px;
  }

  // the switcher css$
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin-left: 5px;
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
    background-color: rgba(white,.15);
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
    background-color: rgba(white,1);
    &.switcher:before {
      background-color: $primary;
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
}
</style>
