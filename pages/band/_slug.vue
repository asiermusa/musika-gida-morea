<template>
  <div>

    <div class="pic-header" v-if="config.serverURL"
      :style="{ 'background-image': 'url(' + config.serverURL + '/uploads/' + band.picture.filename + ')' }">
    </div>

    <div class="band flexbox-layout">
      <div class="flexbox-layout__col1">

        <h2 class="band__name">{{band.name}}</h2>

        <div class="band__details">
          <span class="country">{{ band.town }} | <strong>{{ band.country.label }}</strong></span>
        </div>

        <div class="band__details">
          <i class="la la-tags"></i>
          <ul class="music-list">
            <li v-for="style in musicStyles">{{style}}</li>
          </ul>
        </div>

        <div style="white-space: pre-line" class="band__desc">{{ band.bio}}</div>

        <div class="band-icons">
          <div class="band-icons__icon"><i class="la la-group"></i>
            <div class="band-icons__icon--title">Taldekideak guztira</div>
            {{ band.members }}
          </div>

          <div class="band-icons__icon"><i class="la la-venus"></i>
            <div class="band-icons__icon--title">Emakumeak guztira</div>
            {{ band.women }}
          </div>

        </div>

        <div class="band__women">
          <div class="band__percent">
            <div class="progress-bar" :style="'width: ' + band.percent + '%'"></div>
          </div>
          <div class="progress-bar__percent">%{{band.percent}}</div>
        </div>


        <div class="band__video" v-if="band.video">
          <div class="band__desc">Taldearen bideoa</div>
          <div class="band__video-responsive">
            <iframe :src="band.video" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
          </div>
        </div>

        <div v-if="band.social || band.phone || band.email">
          <div class="band__title">Harremana eta kontaktua</div>
          <div class="band__desc">Taldearekin zuzenean kontaktatzeko telefono eta emailak.
          Egin klik zuzenean deitu edo emaila bidaltzeko.</div>


          <ul v-if="band.phone || band.email" class="band__social">
            <li v-if="band.phone" v-for="phone in phones">
              <a :href="'tel:' + phone"><i class="la la-phone"></i> {{phone}}</a>
            </li>
            <li v-if="band.email" v-for="email in emails" class="item">
              <a :href="'mailto:' + email"><i class="la la-envelope"></i> {{email}}</a>
            </li>
          </ul>


          <div v-if="band.social" class="band__desc">Informazio gehiagorako bisitatu taldearen kanpo loturak:</div>

          <ul v-if="band.social" class="band__social">
              <li v-for="(input, index) in band.social" :data-id="index" class="item">
                <a :href="input[1]" target="_blank">
                  <i class="la la-external-link"></i> {{input[0]}}
                </a>
              </li>
          </ul>
        </div>

      </div>

      <div class="flexbox-layout__col2">
        <img class="band__picture" v-if :src="config.serverURL + '/uploads/' + band.picture.filename" />
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {config} from '@/config'
export default {
  head () {
    return {
      title: this.band.name + ' - ' + config.title
    }
  },
  data() {
    return {
      config,
      myArray: [],
      videoUrl: ''
    }
  },
  asyncData ({ params, redirect }) {
    return axios.get(config.apiURL + '/get-band/' + params.slug)
    .then((res) => {
      if(res.data.band.status == 'publish'){
        return { band: res.data.band }
      }
      else{
        redirect('/')
      }
    })
  },
  created() {
    if(this.band.country)
      this.band.country = this._regions(this.band.country)
  },
  computed: {
    musicStyles(){
      return this.band.music.split(',')
    },
    phones(){
      return this.band.phone.split(',')
    },
    emails(){
      return this.band.email.split(',')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.pic-header {
  position: fixed;
  left: 0;
  top: 75px;
  z-index: 0;
  height: 350px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  animation: backgroundPic .3s;
  animation-delay: .3s;
  animation-fill-mode: forwards;
  opacity: 0;
  display: none;
  @include from(sm){
    display: block;
    mix-blend-mode: multiply;
  }
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, transparent, #f2f2f2, #f2f2f2);
    opacity: .9;

  }
}
.band {
  position: relative;
  display: flex;
  padding: 20px;
  border-radius: 5px;

  &-icons {
    display: flex;
    @include from(sm){
      justify-content: flex-start;
    }
    &__icon {
      border: 1px solid rgba(black,.06);
      border-radius: 3px;
      padding: 10px;
      margin: 0 10px 10px 0;
      @include from(sm){
        padding: 15px;
      }

      &:nth-child(2){
        margin-right: 0;
      }
      &--title {
        font-weight: bold;
        padding: 10px 0;
        font-size: 13px;
        line-height: 14px;
        @include from(sm){
          font-size: 14px;
        }
      }
      i {
        display: block;
        &:before {
          font-size: 26px;
        }
      }
    }
  }

  &__women {
    margin: 20px 0 30px 0;
    padding: 20px;
    font-size: 12px;
    color: $primary;
    background: rgba($primary,.06);
    border-radius: 4px;
  }
  &__percent {
    margin-top: 20px;
    background: rgba($primary,.1);
    height: 10px;
    border-radius: 15px;
    width: 100%;
    .progress-bar {
      height: 100%;
      background: $primary;
      border-radius: 15px;
      animation-name: progressBar;
      animation-duration: 3s;
    }
  }

  .progress-bar__percent {
    width: 100%;
    display: block;
    text-align: right;
    font-size: 15px;
    color: $primary;
    margin: 5px 0;
  }

  &__name {
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__title {
    font-size: 15px;
    margin-top: 20px;
    font-weight: bold;
  }

  &__desc {
    margin: 30px 0;
    padding: 30px 0 0 0;
    border-top: 1px solid rgba(black,.06);
    line-height: 20px;
  }

  &__picture {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 110px;
  }

  &__details {
    font-size: 11px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    margin-top: 15px;
    i {
      margin-right: 10px;
    }
    .music {
      margin-right: 10px;
    }
    .country {
      background: $primary;
      color: white;
      padding: 3px;
      border-radius: 2px;
    }
    ul.music-list {
      li {
        display: inline-block;
        text-transform: uppercase;
        font-size: 11px;
        margin: 0 5px 5px 0;
        border-radius: 3px;
        border: 1px solid rgba(black,.06);
        padding: 3px 6px;
      }
    }
  }
  ul.contact-list {
    display: flex;
    margin-bottom: 15px;
    li a {
      display: inline-block;
      font-size: 13px;
      font-weight: bold;
      border-radius: 3px;
      border: 1px solid rgba(black,.06);
      margin-right: 5px;
      padding: 8px;
      transition: all .15s;
      &:hover {
        background: $primary;
        color: white;
      }
    }
  }

  &__video-responsive {
    position: relative;
    padding-bottom: 56.25%; /* 16/9 ratio */
    padding-top: 30px; /* IE6 workaround*/
    height: 0;
    overflow: hidden;
    & iframe,
    & object,
    & embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__social {
    padding: 0 20px;
    border-radius: 3px;
    border: 1px solid rgba(black,.06);
    margin-bottom: 30px;
    @include from(sm){
      margin: 0;
    }
    li {
      padding: 20px 0;
      font-weight: bold;
      border-bottom: 1px solid rgba(black,.06);
      &:last-child {
        border: none;
      }
    }
  }

  @keyframes progressBar {
    0% {
      width: 0%;
    }
  }
  @keyframes backgroundPic {
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
