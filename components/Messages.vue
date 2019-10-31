<template>
  <div>
    <notifications position="top right" :group="group">
      <template slot="body" slot-scope="props">
         <div v-if="type == 'warn'" class="alerts close" :class="props.item.type" @click="props.close">
            <div class="title">
              Errepasatu erroreak <i class="la la-warning"></i>
            </div>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
        <div v-else class="alerts close" :class="props.item.type" @click="props.close">
          <div class="title">
            {{title}} <i class="la la-check"></i>
          </div>
          <ul>
            <li>{{message}}</li>
          </ul>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  props: [
    'group',
    'type',
    'errors',
    'title',
    'message'
  ]
}
</script>
