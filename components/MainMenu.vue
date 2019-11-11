<template>
  <div class="main-menu">

    <nuxt-link to="/" class="main-menu__logo">
      <img src="~/assets/img/logo.svg" alt="Gida Morea">
    </nuxt-link>

    <!-- network status component -->
    <network-status></network-status>

    <button class="hamburger hamburger--spring main-menu__btn" type="button" @click.prevent="_addMenuClass()">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

    <ul v-if="!user.auth.success" class="main-menu__menu">
      <li>
        <nuxt-link to="/bands">Taldeak</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/zer-da">Zer da gida hau</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/login">Saioa hasi</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/register">Izena eman</nuxt-link>
      </li>
    </ul>
    <ul v-else class="main-menu__menu">
      <li>
        <nuxt-link to="/bands">Taldeak</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/zer-da">Zer da gida hau</nuxt-link>
      </li>
      <li class="main-menu__has-submenu js-submenu avatar" @click.prevent.stop="_submenu()" :class="{avatarActive : isActive}">

        <img v-if="user.auth.picture"
          :src="user.auth.picture"
          class="main-menu__img">

        <v-gravatar v-else
          :email="user.auth.user"
          :size="150" />

        <ul class="main-menu__menu-submenu" :class="{submenuActive : isActive}">
          <li class="user-details">
            <a>
              <img v-if="user.auth.picture"
                :src="user.auth.picture">

              <v-gravatar v-else
                :email="user.auth.user"
                :size="150" />

              <span>
                {{user.auth.user}}
              </span>

            </a>
          </li>
          <li>
            <nuxt-link to="/auth/upload">Talde berria igo</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auth/update">Igotakoak editatu</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auth/send-email">Emaila bidali</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auth/push-notifications">Ezarpenak*</nuxt-link>
          </li>
          <li @click.prevent="_handleLogout()">
            <a>
              Aplikaziotik irten
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import {config} from '@/config'
import {mapState} from 'vuex'
import NetworkStatus from '~/components/NetworkStatus.vue'
export default {
  name: 'MainMenu',
  components: {
    'network-status': NetworkStatus
  },
  data(){
    return{
      isActive: false
    }
  },
  created(){
    if(process.browser){
      let bodyTag = document.getElementsByTagName('body')
      bodyTag[0].addEventListener('click', () => {
        this.isActive = false

        if(document.querySelector('.js-submenu') &&
          document.querySelector('.js-submenu > ul').classList.contains('submenuActive')) {
            document.querySelector('.js-submenu > ul').classList.remove('submenuActive')
        }
      });

      window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 768px)").matches) {
          document.querySelector('.main-menu__menu').classList.remove('submenuActive')
          document.querySelector('.main-menu__btn').classList.remove('is-active')
        }
      })
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': '_closeMenuActive'
  },
  computed: {
    ...mapState({
      user: state => state.users
    })
  },
  methods: {
    _handleLogout() {
      this.$store.dispatch('users/logoutUserAction')
      this.$router.push('/')
    },
    _submenu(e){
      this.isActive = !this.isActive;
    },
    _addMenuClass(){
      if(document.querySelector('.main-menu__menu').classList.contains('submenuActive')){
        document.querySelector('.main-menu__menu').classList.remove('submenuActive')
      }else{
        document.querySelector('.main-menu__menu').classList.add('submenuActive')
      }

      if(document.querySelector('.main-menu__btn').classList.contains('is-active')){
        document.querySelector('.main-menu__btn').classList.remove('is-active')
      }else{
        document.querySelector('.main-menu__btn').classList.add('is-active')
      }
    },
    _closeMenuActive(){
      if(document.querySelector('.main-menu__menu').classList.contains('submenuActive')){
        document.querySelector('.main-menu__menu').classList.remove('submenuActive')
      }

      if(document.querySelector('.main-menu__btn').classList.contains('is-active')){
        document.querySelector('.main-menu__btn').classList.remove('is-active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';
@import '~/assets/scss/vendor/hamburgers/hamburgers.scss';

.main-menu {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 15px 20px;
  background: white;
  @include from(sm){
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 30px;
    border-bottom: 2px solid rgba(black,.06);
  }

  a {
    cursor: pointer;
    display: block;
    margin-left: 20px;
    @include from(sm){
      margin: 0;
    }
  }
  &__btn {
    display: block;
    position: fixed;
    top: 20px;
    right: 10px;
    outline: 0;
    @include from(sm){
      display: none;
    }
  }
  &__logo {
    padding: 0 !important;
    margin: 0 !important;
    max-height: 50px;
    img {
      height: 50px;
      cursor: pointer;
      transition: all .1s;
      &:hover {
        opacity: .9;
      }
    }
  }
  &__menu {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 0;
    top: 75px;
    left: 0;
    background: white;
    list-style: none;
    border-bottom: 2px solid rgba(black,.06);
    transform: translateY(1000px);
    transition: all .5s;
    @include from(sm){
      position: relative;
      top: 0;
      flex-direction: row;
      opacity: 1;
      transform: translateY(0);
      border-bottom: 0;
      height: auto;
    }

    & > li a {
      position: relative;
      display: block;
      line-height: 40px;
      @include from(sm) {
        line-height: 75px;
      }

      &:after {
        @include from(sm){
          transition: all .15s;
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: $primary;
          opacity: 0;
        }
      }
      &:hover {
        color: $primary;
        @include from(sm){
          color: #333;
        }
        &:after {
          opacity: 1;
        }
      }
    }

    &.submenuActive {
      transform: translateY(0);
    }
    li {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin: 0;
      position: relative;
      line-height: 0;

      &:hover {
        cursor: pointer;
      }
      @include from(sm){
        flex-direction: row;
        align-items: center;
      }
      a {
        display: block;
        padding: 0 15px;
      }

      &.avatar {
        &Active {
          &:before{
            content: '';
            position: absolute;
            z-index: -1;
            border-radius: 50%;
            height: 40px;
            width: 40px;
            background: rgba($primary, 1);
            opacity: 0;
            animation: avatarActive .4s;
          }
        }
      }
      // border-right: 1px solid rgba(black,.15);

      &:last-child {
        border: none;
        padding-right: 0;
      }
      & img {
        border-radius: 50%;
        border: 2px solid rgba(black,.1);
        width: 40px;
        height: 40px;
        display: none;
        @include from(sm) {
          display: block;
        }
      }
      &.user-details a {
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        @include from(sm){
          justify-content: flex-end;
        }
        img {
          border-radius: 50%;
          height: 40px;
          width: 40px;
          display: inline-block;
          margin-right: 10px;
          @include from(sm) {
            display: none;
          }
        }
      }

      &.featured {
        font-weight: bold;
        color: $primary;
      }

      &.connected {
        color: $primary;
        font-size: 10px;
        line-height: 15px;
        font-weight: bold;
        border-top: 2px solid rgba(black,.06);
        border-bottom: 2px solid rgba(black,.06);
        padding: 10px 0;
        margin: 15px 0 0 30px;
        @include from(sm) {
          display: none;
        }
      }
    }

    &-submenu {
      width: 100%;
      background: white;
      display: block;
      transition: all .2s;
      @include from(sm){
        position: absolute;
        padding: 0 5px;
        width: 250px;
        top: 75px;
        right: 0;
        text-align: right;
        border: 1px solid rgba(black,.15);
        border-radius: 2px;
        margin-left: 50px;
        opacity: 0;
        visibility: hidden;
      }

      &.submenuActive {
        opacity: 1;
        visibility: visible;
      }

      li {
        display: block;
        font-size: 13px;
        border-right: none;
        background: white;
        border-bottom: 0;
        @include from(sm) {
          border-bottom: 1px solid rgba(black,.15);
        }

        a {
          line-height: 40px;
          @include from(sm){
            line-height: 50px;
          }

          &:after {
            display: none;
          }
        }
        &:hover,
        & a:hover {
          color: $primary;
        }
        &:last-child {
          border: none;
          padding-right: 10px;
        }
      }
    }
  }
}
@keyframes avatarActive {
  0%{
    transform: scale(0);
    opacity: 1;
  }
  100%{
    transform: scale(2);
    opacity: 0;
  }
}
</style>
