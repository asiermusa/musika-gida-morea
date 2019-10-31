<template>
  <div>
    <div class="loader" :class="[color, margin]">
      <div class="loader__spinner"></div>
      <div class="loader__spinner"></div>
      <div class="loader__spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: [
    'color',
    'margin'
  ]
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.loader {
  display: flex;
  justify-content: center;
  padding: 4px 0;
  margin: 30px 0;
  &.no-margin {
    margin: 0;
  }
  &__spinner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $primary;
    opacity: 0;
    margin: 0 3px;
    &:nth-child(1){ animation: loaders 1s infinite .1s; }
    &:nth-child(2){ animation: loaders 1s infinite .2s; }
    &:nth-child(3){ animation: loaders 1s infinite .3s; }
  }
  &.white {
    .loader__spinner {
      background: white;
    }
  }
}

@keyframes loaders {
  0% {
  }
  50% {
    opacity: 1;
  }
  100% {
  }
}
</style>
