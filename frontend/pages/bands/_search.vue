<template>
  <div>

    <div class="no-bands" v-if="total==0 && !list.length">
      <div class="no-bands__icon"><i class="la la-bug"></i></div>
        <div class="no-bands__title">Ez dago bilaketa horrekin bat egiten duen talderik.</div>
        <div class="no-bands__desc">Saia zaitez beste termino batzuekin.
      </div>
    </div>

    <ul class="bands" :class="{bandsMounted : !loader}">
      <li v-for="item in list" class="bands__card">
        <div v-if="item.picture" class="bands__img-content">
          <v-lazy-image
          :src="config.serverURL + '/uploads/thumb-' + item.picture.filename"
          :src-placeholder="require('~/assets/img/lazy.jpg')"
          class="bands__img"/>
        </div>

        <div class="bands__content">
          <div class="bands__percent">
            <div class="progress-bar" :style="'width: ' + item.percent + '%'"></div>
          </div>
          <div class="progress-bar__percent">%{{item.percent}}</div>
          <div class="bands__name">
            {{ item.name}}
          </div>
          <div class="bands__details">
            <span class="music">{{ item.music }}</span>
            <span class="country">{{ item.town }} | <strong>{{ item.country }}</strong></span>
          </div>
          <nuxt-link class="bands__link" :to="'../band/' + item.slug" prefetch>
            <i class="la la-external-link"></i> Gehiago ikusi
          </nuxt-link>
        </div>

      </li>
    </ul>

    <div v-infinite-scroll="_loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <loader v-if="loader"></loader>
    </div>

  </div>
</template>

<script>
import {config} from '@/config'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  head () {
    return {
      title: 'Talde guztiak - ' + config.title
    }
  },
  data() {
    return {
      busy: false,
      response: [],
      list: [],
      loader: false,
      config,
      total: 1
    }
  },
  created () {

    // TODO: sw background sync (static/custom-sw.js)
    navigator.serviceWorker.addEventListener('message', this._onMessage) //handle method, do something

    if(!this.$route.params.search){
      let postData = {
        name: '',
        music: '',
        percent: 1,
        byName: false,
        byWomen: false,
        searching: false
      }
      this.$store.dispatch('search/changeSearchAction', postData)
    }

    this.list = []

  },
  beforeDestroy () {
    // TODO: sw background sync (static/custom-sw.js)
    window.removeEventListener('message', this._onMessage) //handle method, do something
  },
  computed: {
    ...mapGetters({
      searchEvent: 'search/getSearchEvent'
    })
  },
  //Get getter to check if it`s any change on the state
  watch:    {
    searchEvent: {
      handler: function(newItem) {
        this.list = []
        this.total = 1
        // check if is search (params)
        if(this.$route.params.search == "search"){
          this._loadMore()
        }
      },
      deep:true
    }
  },
  methods: {
    _loadMore() {
      this.busy = true
      this.loader = true
      this.$axios.get(config.apiURL + '/bands', {
        params: {
          page: Math.ceil(this.list.length / 12 + 1),
          name: this.searchEvent.name,
          music: this.searchEvent.music,
          percent: this.searchEvent.percent,
          byName: this.searchEvent.byName,
          byWomen: this.searchEvent.byWomen,
          search: 'search'
        },
      }).then(({ data }) => {
        if (data.bands.length) {
          this.total = data.total
          this.busy = false
          this.list = this.list.concat(data.bands);
          if (this.list.length / 12 === 0) { //we must be put the same value in the server request
            this.busy = true
            this.loader = false
          }else{
            this.loader = false
          }
        } else {
          this.busy = true
          this.loader = false
          this.total = 0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.no-bands {
  width: 80%;
  margin: 30px auto;
  text-align: center;

  @include from(sm){
    width: 70%;
  }
  &__icon {
    text-align: center;
    margin: 20px 0;
    i:before {
      font-size: 50px;
    }
  }
  &__title {
    font-size: 16px;
    @include from(sm){
      font-size: 19px;
    }
  }
  &__desc {
    margin: 20px 0;
    font-size: 14px;
    a {
      text-decoration: underline;
    }
  }
}
.bands {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  @include from(sm){
    padding: 0;
  }
  &__card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 48%;
    margin-right: 4%;
    margin-bottom: 4%;
    border: 2px solid rgba(black,.06);
    border-radius: 3px;
    transition: all .2s;
    animation: apiCall .3s;

    &:hover .bands__img {
      transform: scale(1.05);
    }

    &:hover .bands__content{
      transform: translateY(-70px);
    }

    &:hover {
      box-shadow: 0 0 15px rgba(black,.06);
    }

    &:nth-child(2n){
      margin-right: 0;
    }

    @include from(md) {
      width: 30%;
      margin-right: 5%;
      &:nth-child(2n){
        margin-right: 5%;
      }
      &:nth-child(3n){
        margin-right: 0;
      }
    }

    @include from(lg) {
      width: 30%;
      margin-right: 5%;
      &:nth-child(2n){
        margin-right: 5%;
      }
      &:nth-child(3n){
        margin-right: 0;
      }
    }

    @include from(xl) {
      width: 22%;
      margin-right: 4%;
      &:nth-child(2n){
        margin-right: 4%;
      }
      &:nth-child(3n){
        margin-right: 4%;
      }
      &:nth-child(4n){
        margin-right: 0;
      }
    }
  }

  &__img-content {
    max-height: 170px;
    overflow: hidden;
    background: #f2f2f2;
  }

  &__img {
    width: 100%;
    border-radius: 3px 3px 0 0;
    transition: all .4s;
  }

  .v-lazy-image {
    opacity: 0;
    filter: blur(5px);
    transition: all 1s;
  }
  .v-lazy-image-loaded {
    filter: blur(0);
    opacity: 1;
  }

  &__content {
    padding: 10px;
    transition: .2s;
    background: white;
    height: 125px;
    transform: translateY(0);

    @include from(sm){
      padding: 20px;
      height: 135px;
    }
  }

  &__link {
    margin: 30px 0 10px 0;
    display: block;
    text-align: center;
    width: 100%;
    font-size: 11px;
    box-sizing: border-box;
    font-family: $font;
    border-top: 1px solid rgba(black,.06);
    padding-top: 20px;
    transition: all 0.2s;
    &:hover {
      color: $primary;
    }

    @include from(sm) {
      font-size: 13px;
    }
  }

  &__percent {
    background: rgba(black,.06);
    height: 6px;
    border-radius: 4px;
    width: 100%;
    .progress-bar {
      height: 100%;
      background: $primary;
      border-radius: 4px;
      animation-name: progressBar;
      animation-duration: 1.8s;
    }
  }

  .progress-bar__percent {
    width: 100%;
    display: block;
    text-align: right;
    font-size: 11px;
    color: $primary;
    margin: 5px 0;
  }

  &__name {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    min-height: 20px;
    font-weight: bold;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    @include from(sm){
      font-size: 16px;
      min-height: 30px;
    }
  }

  &__details {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    text-transform: uppercase;
    @include from(sm){
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .music {
      margin-right: 10px;
      font-size: 9px;
      margin-bottom: 5px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
        @include from(sm) {
          max-width: 50%;
          font-size: 11px;
          margin: 0;
      }
    }
    .country {
      background: $primary;
      color: white;
      font-size: 8px;
      padding: 3px 5px;
      border-radius: 2px;
      @include from(sm) {
        font-size: 10px;
      }
    }
  }
  @keyframes progressBar {
    0% {
      width: 0%;
    }
  }
  @keyframes apiCall {
    0% {
      transform: scale(.6);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
