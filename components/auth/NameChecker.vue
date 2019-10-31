<template>
  <div>
    <message
      :group="messages.group"
      :type="messages.type"
      :errors="messages.errors"
      title="Aurrera!"
      message="Ez dugu talde honen informazioa. Bidaliguzu!">
    </message>

    <div class="checker" @click.prevent="_checkName">
      <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
      <i v-else class="la la-check"></i>
    </div>

  </div>
</template>

<script>
import {config} from '@/config'
import {mapState} from 'vuex'
export default {
    name: 'NameChecker',
    props: [
      'name'
    ],
    data(){
      return{
        loaderStatus: false,
        check: false,
        messages: {
          group: 'name-checker',
          type: null,
          errors: []
        }
      }
    },
    computed: {
      ...mapState({
        myband: state => state.bands
      })
    },
    methods: {
      async _checkName(){
        this.loaderStatus = true
        this.messages.errors=[]

        let params = {
          name: this.name,
          checker: 'checker'
        }

        if(this.name){

          //utils/utils.js
          this._bands(params).then((res) => {
            if(res.length){
              this.check = true
              this.messages.errors.push('Talde hau existitzen da gure datu-basean.')
              this.$emit('bandChange', [true, res[0]])
              this._message('warn')
            }else{
              this.check = false
              this.$emit('bandChange', false)
              this._message('success')
            }
            this.loaderStatus = false
          });

        }else{
          this.loaderStatus = false
          this.messages.errors.push('Taldearen izena idatzi mesedez')
          this._message('warn')
        }
      },
      _message(type){
        this.messages.type = type
        setTimeout(() => {
          this.$notify({
            group: this.messages.group,
            type: type,
            duration: 3000,
          })
        }, 100)
      }
    }
  }
</script>

<style lang="scss" scoped>

@import '~/assets/scss/main.scss';

.checker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 0;
  margin-top: 0;
  margin-left: 5px;
  background: $primary;
  color: white;
  outline: 0;
  transition: all .2s;
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      font-size: 20px;
    }
  }
  cursor: pointer;
  &:hover {
    background: darken($primary, 10%);
    color: white;
  }
}
</style>
