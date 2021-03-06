<template>
  <div class="search-box" :class="{ isClose : !open }">
    <div class="search-box__controls">
      <button @click="open = !open" v-if="open == false">
        <span>Bilaketa berria egin</span> <i class="la la-search"></i>
      </button>

      <button @click="open = !open" v-else class="close">
        <i class="la la-close"></i>
      </button>
    </div>

    <VueSlideToggle :open="open" tag="section" :duration="200">

      <form class="search-box-container" method="post" @submit.prevent="_send()">

        <div class="search-box__inputs">
          <input type="text" placeholder="Taldearen izena" v-model="searchData.name" @focus="_focusEvent()">
          <input type="text" placeholder="Taldearen estiloa" v-model="searchData.music" @focus="_focusEvent()">
        </div>

        <div class="slidecontainer">
          <div class="text">Emakumezkoen portzentaia</div>
          <input type="range" min="1" max="100" value="" class="slider" v-model="searchData.percent">
          <div class="search-box__qty"><strong>%<span v-text="total"></span></strong></div>
        </div>

        <div class="checkbox-container">
          <label class="checkbox-label">Alfabetikoki ordenatu
            <input type="checkbox" v-model="searchData.order.byName">
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-label">Emakume kopuruz ordenatu
            <input type="checkbox" v-model="searchData.order.byWomen">
            <span class="checkmark"></span>
          </label>
        </div>

        <button type="submit" class="submit">
          <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
          <span v-else>Bilaketa egin</span>
        </button>

      </form>

    </VueSlideToggle>

  </div>
</template>

<script>
import {config} from '@/config'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import { VueSlideToggle } from 'vue-slide-toggle'

export default {
  name: 'SearchBox',
  components: {
    VueSlideToggle
  },
  data() {
    return {
      loaderStatus: false,
      open: false,
      selected: {label: '', value: ''},
      searchData: {
        name: '',
        music: '',
        percent: 1,
        order: {
          byName: false,
          byWomen: false
        }
      }
    }
  },
  created(){
    this._getWindowWidth()
    window.addEventListener('resize', this._getWindowWidth)
  },
  computed: {
    ...mapGetters({
      searchEvent: 'search/getSearchEvent'
    }),
    total() {
      return this.searchData.percent
    }
  },
  //Getterak jasotzen du ea statean aldaketarik egon den.
  watch:{
    $route (to, from){
        if(to.name == 'bands') {
          this.open = true
        }else{
          this._getWindowWidth()
        }
    },
    searchEvent: {
      handler: function() {
        this.loaderStatus = false
      },
      deep:true
    }
  },
  methods: {
    _getWindowWidth(){
      setTimeout(()=> {
        if(this.windowWidth > 768){
          this.open = true
        }else if(this.$route.name == 'bands'){
          this.open = true
        }else{
          this.open = false
        }
      }, 10)
    },
    _focusEvent(){
      this.open = true
    },
    _send() {
      this.loaderStatus = true
      let postData = {
        name: this.searchData.name,
        music: this.searchData.music ? this.searchData.music : '',
        percent: this.searchData.percent,
        byName: this.searchData.order.byName,
        byWomen: this.searchData.order.byWomen
      }
      this.$store.dispatch('search/changeSearchAction', postData)
    }
  }
}
</script>

<style lang="scss" scoped>

@import '~/assets/scss/main.scss';

.search-box {

  &__controls {
    display: flex;
    justify-content: flex-end;
    button {
      display: flex;
      align-items: center;
      border: 0;
      background: transparent;
      color: #222;
      outline: 0;
      border-radius: 3px;
      padding: 5px;

      span {
        font-style: italic;
        color: rgba(black, .8);
        font-size: 8px;
      }

      &.close {
        color: white;
        margin-bottom: 20px
      }

      &:hover {
        cursor: pointer;
      }
      i:before {
        font-size: 20px;
      }
    }
    @include from(sm){
       display: none;
    }
  }

  position: relative;
  width: 92%;
  background-image: linear-gradient(45deg, $primary, darken($primary,10%));
  padding: 15px;
  border-radius: 8px;
  margin: 15px auto;

  &.isClose {
    background-image: linear-gradient(45deg, #f8f8f8, darken(#f8f8f8,10%));
  }
  @include from(sm){
    position: fixed;
    left: 30px;
    top: 150px;
    width: 300px;
    margin: 0;
    z-index: 1;
  }

  .submit {
    margin-top: 0;
  }

  &__inputs {
    display: flex;
    justify-content: space-between;

    @include from(sm){
       display: block;
    }
    input[type="text"]{
      width: 49%;
      @include from(sm){
        width: 100%;
      }
    }
  }

  &__titles {
    color: white;
    font-size: 18px;
    padding: 0 0 20px 0;
  }
  &__qty {
    color: white;
    margin: 10px 0;
    border-radius: 2px;
    text-transform: uppercase;
    font-size: 13px;
  }

  // slider
  .slidecontainer {
      width: 100%; /* Width of the outside container */
      margin: 15px 0;

      & .text {
        color: rgba(white,.35);
        font-size: 11px;
        margin-bottom: 5px;
      }
  }

  /* The slider itself */
  .slider {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 100%; /* Full-width */
    height: 4px; /* Specified height */
    border-radius: 2px;
    background: white; /* Grey background */
    outline: none; /* Remove outline */
    transition: opacity .2s;
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 50%;
    background: white; /* Green background */
    border: 3px solid $primary;
    cursor: pointer; /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 50%;
    background: $primary; /* Green background */
    border: 2px solid white;
    cursor: pointer; /* Cursor on hover */
  }

  /* Customize the label (the container) */
  .checkbox-container{
    margin: 0 0 30px 0;
    .checkbox-label {
      display: block;
      position: relative;
      padding-left: 28px;
      margin-bottom: 10px;
      cursor: pointer;
      font-size: 13px;
      color: white;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      /* Create a custom checkbox */
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 100%;
        height: 20px;
        width: 20px;
        border: 2px solid white;
        transition: all .25s;
        &:after {
          content: "";
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid $primary;
          border-width: 0 2px 2px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
      /* On mouse-over, add a grey background color */
      &:hover input ~ .checkmark {
        //background-color: #ccc;
      }
      /* When the checkbox is checked, add a blue background */
      & input:checked ~ .checkmark {
        background-color: white;
        &:after {
          display: block;
        }
      }
    }
  }
}
</style>
