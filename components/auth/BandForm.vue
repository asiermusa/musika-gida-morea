<template>
  <div>

    <!-- exclusive administrator view -->
    <form id="form" class="update-form" enctype="multipart/form-data">

      <div class="update-form__content flexbox-layout">

        <div class="flexbox-layout__col1">

          <!-- admin view component -->
          <adminview
            :currentUser="currentUser"
            :band="band">
          </adminview>
          <!-- admin view component -->

          <div class="update-form__name-checker">
            <!-- disable band name if 'mode' is update -->
            <template v-if="mode == 'update'">
              <input type="hidden" name="name" placeholder="Band Name" v-model="band.name">
              <div class="disabled is-active">{{band.name}}</div>
            </template>
            <template v-else>
              <input type="text" name="name" placeholder="Taldearen izena" v-model="band.name">
            </template>

            <!-- name checker component -->
            <namechecker
              v-if="mode == 'upload'"
              :name="band.name"
              @bandChange="_bandChange">
            </namechecker>

          </div>

          <div v-if="mode == 'upload'" class="notes">
            Egin klik <i class="la la-check"></i> ikonoan taldea datu-basean dagoen jakiteko.
          </div>

          <!-- if band exists send email with changes -->
          <div class="band-change"
            :class="{'is-active': bandChange}"
            v-if="bandChange">

            <!-- send changes email component -->
            <send-changes-email
              v-if="bandChange"
              :band="this.selectedBand"
              :user="this.currentUser.username">
            </send-changes-email>

          </div>
          <!-- if band exists send email with changes -->

          <!-- else upload or update band -->
          <template v-else>

            <!-- band NAME -->
            <input type="text" name="music" placeholder="Musika estiloa(k) komaz bereizita" v-model="band.music">
            <!-- band REGION -->
            <div class="update-form__region">
              <v-select v-model="band.country" :options="countryList"></v-select>
              <div>
                <input type="text" name="town" placeholder="Herria" v-model="band.town">
              </div>
            </div>
            <!-- band BIO -->
            <textarea name="bio" rows="4" cols="80" v-model="band.bio" placeholder="Biografia laburra"></textarea>
            <!-- band WOMEN -->
            <div class="update-form__title">
              Emakume kopurua
            </div>
            <div class="update-form__desc">
              Esaiguzu taldekide kopurua eta horietatik zenbat diren emakumezkoak.
            </div>
            <!-- band SLIDER -->
            <div class="slidecontainer">
              <input type="range" min="1" max="20" class="slider" name="members" v-model="band.members">
              <div v-if="band.members < 2" class="qty"><strong>Taldekide <span v-text="band.members"></span> </strong></div>
              <div v-else class="qty"><strong><span v-text="band.members"></span> taldekide</strong></div>
            </div>

            <div class="slidecontainer">
              <input type="range" min="1" max="20" class="slider" name="women" v-model="band.women">
              <div v-if="band.women < 2" class="qty"><strong>Emakume <span v-text="band.women"></span></strong></div>
              <div v-else class="qty"><strong><span v-text="band.women"></span> emakume</strong></div>
            </div>
            <!-- band YOUTUBE -->
            <div class="update-form__title">
              Youtubeko bideoa
            </div>
            <div class="update-form__desc">
              Itsatsi URLa eta itxaron bideoa ondo kargatu dela ikusi arte.
            </div>

            <div class="update-form__video">
              <input type="text" @input="_onConvertUrl($event)" placeholder="Youtubeko URLa itsatsi">
              <input type="hidden" name="video" v-model="videoUrl">
              <loader v-if="loader"></loader>
              <div class="update-form__video-error" v-if="videoError">
                <i class="la la-chain-broken"></i> Bideoaren URLa ez da zuena...
              </div>
              <div class="update-form__video-responsive" v-if="videoUrl">
                <iframe :src="videoUrl" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
              </div>
            </div>
            <!-- band LINKS -->
            <div class="update-form__title">
              Kanpo loturak
            </div>
            <div class="update-form__desc">
              Taldearen lotura interesgarrien berri eman: webgunea, bandcamp, twitter...
              Hauek bistaratzeko ordena ere alda dezakezu beraien artean arrastatuz.
            </div>

            <ul class="update-form__social">
              <draggable :list="socialArray">
                <li v-for="(input, index) in socialArray" :data-id="index" class="item">
                  <v-select v-model="input.one":options="socialList"></v-select>
                  <input type="hidden" v-model="input.one" :name="'share[' + index + ']'">
                  <input type="text" v-model="input.two" placeholder="URLa hemen (https eta guzti)" :name="'share[' + index + ']'">
                  <button @click.prevent="_deleteSocialLink(index)" class="delete"><i class="la la-trash-o"></i></button>
                </li>
              </draggable>
            </ul>
            <button @click.prevent="_addSocialLink" class="add"><i class="la la-plus"></i> Lotura berria</button>

          </template>

        </div>
        <!-- flexbox-layout__col1 -->

        <div v-if="!bandChange" class="flexbox-layout__col2">

          <div class="image-content">

            <div class="image-preview">
              <img id="image" v-if="url" :src="url" />
              <div v-else>
                <img id="image" v-if="mode == 'update'" :src="config.serverURL + '/uploads/thumb-' + band.picture.filename" />
              </div>
            </div>

            <input type="file" name="picture" accept="image/*" @change="_onFileChanged"><br>
            <div class="update-form__title">
              <i class="la la-image"></i> Taldearen argazkia
            </div>
            <div class="update-form__desc">
              Argazki bat igotzea nahitaezkoa da. Irudiak gutxienez 400 pixel
              zabal izan beharko ditu eta tamaina maximoa mega batekoa izango da.
            </div>
          </div>

        </div>
        <!-- flexbox-layout__col2 -->

        <div class="flexbox-layout__col1">
          <button v-if="!bandChange" @click.prevent="_emit()" class="submit">
            <loader v-if="loaderStatus" color="white" margin="no-margin"></loader>
            <span v-else>Taldearen informazioa gorde</span>
          </button>
        </div>
        <!-- flexbox-layout__col1 -->
      </div>

    </form>

  </div>
</template>

<script>
import {config} from '@/config'
import adminview from '@/components/auth/AdminView'
import namechecker from '@/components/auth/NameChecker'
import SendChangesEmail from '@/components/auth/SendChangesEmail'

export default {
  name: 'BandForm',
  components: {
    adminview,
    namechecker,
    'send-changes-email': SendChangesEmail
  },
  props: [
    'loaderStatus',
    'band',
    'currentUser',
    'mode'
  ],
  data(){
    return{
      fields: [],
      config,
      countryList: config.countryList,
      socialList: config.socialList,
      bandChange: false, // selected band to make changes (send-changes-email)
      selectedBand: null, // selected band to make changes (send-changes-email)
      url: null,
      file: null,
      socialArray: [],
      videoError: false,
      videoUrl: '',
      loader: false
    }
  },
  mounted(){
    //this function is on _utils
    this.band.country = this._regions(this.band.country)
    this.videoUrl = this.band.video
    this._getSocialLinks()
  },
  methods: {
    _emit(){
      let image, user
      if(document.getElementById("image")) {
        image = document.getElementById("image").naturalWidth
      }

      (this.currentUser.role == 'administrator') ? user = this.band.user : user = this.currentUser._id
      this.$emit('clicked', [
        user,
        this.file,
        image
      ])
    },
    _bandChange(e){
      this.bandChange = e
      this.selectedBand = e[1]
    },
    _getSocialLinks(){
      if(this.band.social){
        this.band.social.forEach(social => {
          this.socialArray.push({
            one: social[0],
            two: social[1],
          })
        })
      }
    },
    _addSocialLink() {
      this.socialArray.push({
        one: '',
        two: ''
      });
    },
    _deleteSocialLink(index) {
      if(this.socialArray.length > 0)
        this.socialArray.splice(index,1)
    },
    _onFileChanged(e) {
      let myfile = e.target.files[0]
      if(myfile){
        this.file = myfile
        this.band.picture = null
        this.url = URL.createObjectURL(myfile)
      }
    },
    _onConvertUrl(e){
      this.videoError = false
      this.loader = true
      this.videoUrl = ''
      setTimeout(() => {
        let url = e.target.value
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
          this.videoUrl = '//www.youtube.com/embed/' + match[2]
        } else {
          this.videoUrl = ''
          this.videoError = true
        }

        if(url == ''){
          this.videoError = false
          this.videoUrl = this.band.video
        }

        this.loader = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.update-form {
  position: relative;
  font-size: 14px;
  &__content {
    display: flex;
    flex-wrap: wrap;
  }

  &__name-checker {
    display: flex;
    justify-content: space-between;
    input {
      margin-bottom: 0;
    }
  }

  .notes {
    font-size: 10px;
    font-style: italic;
    margin-bottom: 20px;
  }

  &__region {
    display: flex;
    justify-content: space-between;
    & > div {
      width: 46%;
      margin-bottom: 20px;

      input {
        margin-bottom: 0;
      }
    }
  }

  &__title {
    font-size: 15px;
    padding-top: 20px;
    margin-top: 30px;
    font-weight: bold;
    border-top: 1px solid rgba(black,.06);
  }

  &__desc {
    margin-top: 15px;
    margin-bottom: 30px;
    line-height: 20px;
  }

  &__video-error {
    padding: 10px 0;
    color: red;
    font-weight: bold;
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
    .item {
      display: flex;
      justify-content: space-between;
      & > div {
        margin-bottom: 20px;

        &.dropdown {
          width: 250px;
          margin-right: 5px;
        }
        input {
          margin-bottom: 0;
        }
      }

      .delete {
        display: flex;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 4px;
        border: 0;
        margin-left: 5px;
        background: rgba(black,.06);
        color: white;
        font-size: 50px;
        color: rgba(black,.5);
        outline: 0;
        transition: all .2s;
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          &:before {
            font-size: 20px;
          }
        }
        cursor: pointer;
        &:hover {
          background: $primary;
          color: white;
        }
      }
    }
  }
  .image-content {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 110px;
  }
  .image-preview {
    img {
      margin-bottom: 10px;
    }
  }

  .add {
    border: 0;
    background: transparent;
    font-size: 13px;
    font-family: $font;
    color: $primary;
    margin: 10px 0 30px 0;
    cursor: pointer;
    outline: 0;
  }

  .qty {
    font-weight: normal;
    margin-top: 15px;
    color: $primary;
    font-size: 12px;
    text-align: right;
  }
}

textarea {
  height: 200px;
}

//files
input[type=file] {
  cursor: pointer;
  width: 100%;
  height: 50px;
  overflow: hidden;
}

input[type=file]:before {
  width: 100%;
  height: 50px;
  font-size: 13px;
  font-family: $font;
  font-weight: bold;
  line-height: 50px;
  content: 'Argazkia igo';
  display: inline-block;
  background: #333;
  color: white;
  padding: 0 10px;
  text-align: center;
  border-radius: 5px;
}

input[type=file]::-webkit-file-upload-button {
  visibility: hidden;
}

// slider
.slider {
  background: $primary;
}
.slider::-webkit-slider-thumb {
  background: white;
  border: 3px solid $primary;
}
.slider::-moz-range-thumb {
  background: white;
  border: 2px solid $primary;
}

</style>
