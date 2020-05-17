importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/05b766d37d034e31f1ad.js",
    "revision": "3814c7e317c4de4196c91d2b4d6d66e8"
  },
  {
    "url": "/_nuxt/065c59cdfcd33a60821c.js",
    "revision": "b9fe6f03eecaf8576398292ffc935dd7"
  },
  {
    "url": "/_nuxt/086fbedf6917b4f5d676.js",
    "revision": "d29febcd96986d6aab2da1d5d121778c"
  },
  {
    "url": "/_nuxt/0d7066b76ee51d737dc4.js",
    "revision": "f0b5a66da57411e11ae3a6694ddded88"
  },
  {
    "url": "/_nuxt/1619ff810b0dbcdc4f15.js",
    "revision": "a3f5c405f0f25849fbe06d7685e60f08"
  },
  {
    "url": "/_nuxt/18536ae9998809bc7c93.js",
    "revision": "2d8ba2d8aa866ad0524722edceba33a9"
  },
  {
    "url": "/_nuxt/2386dd3cfce8b7e0c932.js",
    "revision": "2d897b68ed9b3508c5205a589bfccbe6"
  },
  {
    "url": "/_nuxt/244b4d0128d7a7dc8945.js",
    "revision": "671cea163f56570fb72a1b0cf4a66cb4"
  },
  {
    "url": "/_nuxt/27dfbcbc656617dfe4a4.js",
    "revision": "37f957a2c1ed0ca9f2213722bd81bcdb"
  },
  {
    "url": "/_nuxt/2b734d6cb864d04ab52e.js",
    "revision": "6e414923ded3d725552ef8348a237214"
  },
  {
    "url": "/_nuxt/40d9ca5c0ed6d43162c7.js",
    "revision": "28060827bf1a07bba666b8006f6a8f19"
  },
  {
    "url": "/_nuxt/4602668a3d9b4715457a.js",
    "revision": "644667765a3f6043607f2b22ed00fdf6"
  },
  {
    "url": "/_nuxt/6661fa67bcb214be5ca1.js",
    "revision": "fc2969f38d1e899d413dec16e0d57de0"
  },
  {
    "url": "/_nuxt/69dbd6e970b04707154f.js",
    "revision": "33081e8378e451960b45dc4a7d345387"
  },
  {
    "url": "/_nuxt/7eb8bce32a4a7525b8ed.js",
    "revision": "c3ad98304704da6b41248869cb2467c2"
  },
  {
    "url": "/_nuxt/8283586bd2e6690a9dcc.js",
    "revision": "904e0141e341b74223759e5916ffade0"
  },
  {
    "url": "/_nuxt/87266ad0a12231294643.js",
    "revision": "234f41954e426396116fe96b56e3409a"
  },
  {
    "url": "/_nuxt/9e045dd2511af3c5f2cc.js",
    "revision": "4a5b9873e16ad2d1e84e6583a57a6eb7"
  },
  {
    "url": "/_nuxt/ae96f764e39c1c773c40.js",
    "revision": "443786ee00803c964757b87a3fdf71f0"
  },
  {
    "url": "/_nuxt/be698750a361cf6fd237.js",
    "revision": "16a3a366db326bc77b59764f0057a833"
  },
  {
    "url": "/_nuxt/c5e58e201cca2a964136.js",
    "revision": "9ca1cd6ca9af43a6e82f23db1caefe33"
  },
  {
    "url": "/_nuxt/ec6845d7fb71dc8b4d6e.js",
    "revision": "bb3323b18eaa10e0bbc603ccf62f29ef"
  },
  {
    "url": "/_nuxt/ef6e73f5ee52f90ed399.js",
    "revision": "8802f46ccd1517445da14df2b75233c9"
  },
  {
    "url": "/_nuxt/fcc6e4055b7bbb4f11e7.js",
    "revision": "660ef132ba07ab103fdbfd5a744194bd"
  }
], {
  "cacheId": "MusikaGidaMorea",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
