<template>
  <div class="main-content">

    <div class="new-band">
      <div class="new-band__icon"><i class="la la-check"></i></div>
      <div class="new-band__title">Taldea ondo gorde da</div>
      <div class="new-band__desc"><span class="new-band__name">{{ this.$route.params.new }}</span> taldearen atuak ondo
        jaso dira. Ahalik eta azkarren informazioa berrikusi eta publikatuko dugu.
        <br><br>Eskerrik asko!</div>
    </div>

  </div>
</template>

<script>
import {config} from '@/config'
export default {
  head () {
    return {
      title: 'Talde berria igota - ' + config.title
    }
  }
}
</script>

<style lang="scss">

@import '~/assets/scss/main.scss';

.new-band {
  width: 80%;
  margin: 30px auto;
  text-align: center;

  @include from(sm){
    width: 70%;
  }

  &__name {
    text-transform: uppercase;
    font-weight: bold;
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
    font-size: 13px;
    a {
      text-decoration: underline;
    }
  }
}

</style>
