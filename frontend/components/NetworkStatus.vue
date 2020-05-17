<template>
  <div class="network-status" :class="{isOffline : isOffline, isClose : isClose}">
    <div>
      <i class="la la-wifi"></i> Ez duzu internetera konexiorik...
    </div>
    <a href="#" @click="_handleClose()">
      <i class="la la-close"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'NetworkStatus',
  data(){
    return{
      isOffline: false,
      isClose: false
    }
  },
  created(){
    window.addEventListener('online', this._networkStatus)
    window.addEventListener('offline', this._networkStatus)
    this._networkStatus()
  },
  methods: {
    _networkStatus(){
      (navigator.onLine) ? this.isOffline = false : this.isOffline = true;
      this.isClose = false
    },
    _handleClose(){
      this.isClose = !this.isClose
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.network-status {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  height: 35px;
  line-height: 35px;
  padding: 0 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(30deg, #222, #222);
  box-shadow: 0 5px 20px rgba(black,.2);
  color: white;
  text-align: center;
  font-size: 12px;
  opacity: 0;
  transition: all .5s;
  transform: translateY(300px);
  &.isOffline {
    opacity: 1;
    transform: translateY(0);
  }
  &.isClose {
    opacity: 0;
    transform: translateY(300px);
  }
  & a {
    color: white;
    height: 35px;
    line-height: 35px;
  }
  & i {
    min-width: 30px;
    height: 35px;
    line-height: 35px;
    &:before {
      font-size: 20px;
    }
    &.la-wifi:before {
      animation: wifi 3s infinite;
    }
  }
}

@keyframes wifi {
  0% {
    font-size: 20px;
  }
  40% {
    font-size: 20px;
  }
  45% {
    font-size: 15px;
  }
  50% {
    font-size: 20px;
  }
  55% {
    font-size: 15px;
  }
  60% {
    font-size: 20px;
  }
  100% {
    font-size: 20px;
  }
}
</style>
