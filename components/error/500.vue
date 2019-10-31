<template>
  <div class="error-404">
    <div class="error-page__icon"><i class="la la-bug"></i></div>
      <div class="error-page__title">Atal hau ez da existitzen...</div>
      <div class="error-page__desc">500 errorea aurkitu duzu. Badirudi zerbait ez dagoela uste genuen bezain ondo... Barkatu eragozpenak.</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'error-500',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
