const pkg = require('./package')
const env = require('dotenv').config()
import {config} from './config'
//import { I18N } from './langs'

module.exports = {
  mode: 'spa',
  env: env.parsed,
  router: {
    middleware: 'check-auth',
    mode: 'hash',
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: config.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no"' },
      { hid: 'description', name: 'description', content: 'Euskal Herriko emakumezko taldeen bozgorailua.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuex-persisted', ssr: false },
    { src: '~/plugins/plugins', ssr: false },
    { src: '~/plugins/axios', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/paulgv/nuxt-i18n-example
    //['nuxt-i18n', I18N]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

  manifest: {
    name: 'Musika Gida Morea',
    short_name: "MGMorea",
    lang: 'eus',
    theme_color: "#ffffff", //#7b3772
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/"
  },

  workbox: {

    //   runtimeCaching: [
    //   {
    //     // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
    //     //urlPattern: 'https://my-cdn.com/.*',
    //     // Defaults to `networkFirst` if omitted
    //     // handler: 'networkFirst',
    //     // Defaults to `GET` if omitted
    //     // method: 'GET'
    //     urlPattern: 'http://127.0.0.1:3000/api/v1',
    //     handler: 'networkOnly',
    //     strategyOptions: {
    //       //background sync. conf
    //       backgroundSync: {
    //         name: 'gidamoure',
    //         options: {
    //           maxRetentionTime: 60 * 60,
    //         }
    //       }
    //     }
    //   }
    // ],
    swURL: 'firebase-messaging-sw.js'
  }
}
