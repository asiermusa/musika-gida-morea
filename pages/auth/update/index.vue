<template>
  <div class="main-content">

    <h2 v-if="myUser.role == 'administrator'">Talde guztien zerrenda ({{ total }})</h2>
    <h2 v-else>Nik igotako taldeak ({{ total }})</h2>

    <div class="admin" v-if="myUser.role == 'administrator'">
      Gogoratu!
      <div class="admin__desc">
        Administrari bezala erabiltzaile guztiek igotako talde guztiak ikusten zabiltza,
        aktibo daudenak eta aktibatzeko falta direnak barne <strong>({{ total }} talde).</strong>
        <br>Kontu handiz egin, egin beharreko aldaketak.
      </div>
    </div>

    <ul class="update-list">
      <li v-for="item in list" :id="item._id">

        <div v-if="item.picture" class="update-list__picture">
          <img :src="config.serverURL + '/uploads/thumb-' + item.picture.filename"/>
          <div class="update-list__percent">%{{ item.percent }}</div>
        </div>

        <div class="update-list__desc">
          <div class="update-list__name">{{ item.name }}</div>
          <div class="update-list__user"><i class="la la-user"></i> {{ _getUser(item.user) }}</div>
          <div class="update-list__status-container">
            <div v-if="item.status == 'publish'">
              <div class="update-list__status publish"></div> <span>Publikatua</span>
            </div>
            <div v-else>
              <div class="update-list__status pending"></div> <span>Esperoan</span>
            </div>
          </div>
        </div>
        <div class="update-list__actions">
          <nuxt-link :to="'/auth/update/' + item._id">Aldatu</nuxt-link>
          <a href="#" @click.prevent="_deleteBand(item._id)" class="delete">Ezabatu</a>
        </div>

      </li>
    </ul>

    <div v-infinite-scroll="_loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <loader v-if="loader"></loader>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {config} from '@/config'
import {mapState} from 'vuex'

export default {
  middleware: 'auth',
  head () {
    return {
      title: 'Nik igotako taldeak - ' + config.title
    }
  },
  asyncData ({ params }) {
      return axios.get(config.apiURL + '/user-info')
      .then((res) => {
        return { myUser: res.data.user }
      })
  },
  data() {
    return {
      authors: {},
      user: [],
      response: [],
      list: [],
      total: 0,
      loader: false,
      busy: false,
      config
    }
  },
  mounted(){
    this._getUsers()
    this._currentUser()
  },
  methods: {
    _getUsers() {
      this.$axios.get(config.apiURL + '/users'
      ).then(res => {
          this.authors = res.data.users
        })
        .catch(error => {
        })
        return this.authors
    },
    _getUser(id){
      if(id && this.authors){
        var found = this.authors.find(user => {
          if(user._id == id){
            return user
          }
        });
        if(found)
          return found.username
      }
    },
    _currentUser(){
      this.$axios.get(config.apiURL + '/user-info'
      ).then(res => {
          this.user = res.data.user
        })
        .catch(error => {
        })
        return this.user
    },
    _deleteBand(band) {
      let r = confirm("Taldea ezabatu nahi duzu?");
      if (r == true) {
        this.$axios.delete(config.apiURL + '/delete/' + band)
          .then(response => {
            //handle success
            document.getElementById(band).style="display:none"
            this.total --
          })
          .catch(err => {
            //handle error
          })
        }
    },
    _loadMore() {
      // setTimeout is required tu persiste vuex state before rendering the page
        this.busy = true
        this.loader = true
          this.$axios.get(config.apiURL + '/bands', {
            params: {
              page: Math.ceil(this.list.length / 12 + 1),
              role: this.myUser.role || 'author',
              user: this.myUser._id || null
            },
          }).then(({ data }) => {
            if (data.bands.length) {
                 this.busy = false
                 this.list = this.list.concat(data.bands)
                 this.total = data.total
                 if (this.list.length / 12 === 0) {
                   this.busy = true
                   this.loader = false
                 }
               } else {
                 this.busy = true
                 this.loader = false
               }
          })
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~/assets/scss/main.scss';

.admin {
  padding: 30px 20px;
  margin-bottom: 30px;
}

.update-list {
  li {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 2px solid rgba(black,.06);
    border-radius: 2px;
    margin-bottom: 20px;
    animation: apiCall .3s;
  }
  &__picture {
    position: relative;
    margin: 0;
    padding: 0;
    height: 95px;
    width: 30%;
    overflow: hidden;
    @include from(sm) {
      width: 15%;
    }
    img {
      height: 95px;
    }
  }

  &__percent {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 10px;
    font-weight: bold;
    background: white;
    padding: 3px 6px;
  }
  &__desc {
    padding: 10px 20px;
    width: 70%;
    @include from(sm) {
      width: 60%;
    }
  }
  &__name {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  &__user {
    font-size: 12px;
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid rgba(black,.06);
    @include from(md) {
      width: 25%;
      height: 60px;
      border-left: 2px solid rgba(black,.06);
      border-top: none;
    }
    a {
      margin: 0 10px;
      font-size: 12px;
    }
    .delete {
      color: #9b0009;
    }
  }

  &__status-container {
    margin-top: 10px;
    line-height: 10px;
    span {
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  &__status {
    display: inline-block;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    line-height: 10px;
    &.pending {
      background: #ffff80;
    }
    &.publish {
      background: #83ff39;
    }
  }

  @keyframes apiCall {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
