<template>
  <div class="error-page">
    <component :is="errorPage" :error="error" />
  </div>
</template>
<script>
import error404 from '~/components/error/404.vue';
import error500 from '~/components/error/500.vue';
export default {
  name: 'nuxt-error',
  layout: 'default', // optional
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return error404;
      }
      // catch everything else
      return error500;
    },
  }
};
</script>

<style lang="scss">
@import '~/assets/scss/main.scss';

.error-page {
  width: 100%;
  margin: 0 auto;
  text-align: center;

  @include from(sm){
    width: 70%;
  }
  &__icon {
    text-align: center;
    margin: 30px 0;
    i:before {
      font-size: 50px;
    }
  }
  &__title {
    font-size: 16px;
    font-weight: 700;
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
</style>
