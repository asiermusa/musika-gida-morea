importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0034bbfff7b56679286c.js",
    "revision": "48cd29d7f79ab58ab17ab8a22121c8e8"
  },
  {
    "url": "/_nuxt/0266020a5dfa3ef831bd.js",
    "revision": "4c6e488150ed60847c97c6d369dd4d82"
  },
  {
    "url": "/_nuxt/16f8436e31f64bf0bb42.js",
    "revision": "3ad30063e9cfd1528082366f817c158a"
  },
  {
    "url": "/_nuxt/18ddf08129a889cbac11.js",
    "revision": "2ea3f41f4c5556021ab20786131b8d96"
  },
  {
    "url": "/_nuxt/289fc78a6b3f9d2d099c.js",
    "revision": "4d0cf4f08e1988c82cc62a6a2c9a8e61"
  },
  {
    "url": "/_nuxt/2903609721e9e788d433.js",
    "revision": "b3c3017d804a1531d914164ba5df8179"
  },
  {
    "url": "/_nuxt/3b9a1fd21c36b3e2c1ca.js",
    "revision": "67a5f9eb610944afee02204a16e5c3e8"
  },
  {
    "url": "/_nuxt/3c8e8f32a065aebf82e5.js",
    "revision": "b44eeea483447d555560300a2cfe8490"
  },
  {
    "url": "/_nuxt/49c9b3592f870a04f3d3.js",
    "revision": "57bcd55082ca8c3b045f387b8414a083"
  },
  {
    "url": "/_nuxt/63b40ae585fdf4216714.js",
    "revision": "5c4e2ad2b85de3427443c33a9a5c40f9"
  },
  {
    "url": "/_nuxt/6b4ab68bbca21e60967f.js",
    "revision": "7802024114aabaecbef7c37e28756ea5"
  },
  {
    "url": "/_nuxt/734564aa2e326fb208f6.js",
    "revision": "6b95680ff7aaf498304178ef4b16beee"
  },
  {
    "url": "/_nuxt/88d3c11a03125f701ac7.js",
    "revision": "da2841dd8e36f6494ef5d769f05e105c"
  },
  {
    "url": "/_nuxt/90db31e749842e478369.js",
    "revision": "f4d30b9c5884f587fac9360105c71c6a"
  },
  {
    "url": "/_nuxt/a0c77f277abff4e5b84c.js",
    "revision": "e3eb8a5b82530f48d54b1fcf6d563d27"
  },
  {
    "url": "/_nuxt/acd5f9c8c6973582b5d5.js",
    "revision": "04c7d18945d7ca46883e28e7866aa2b1"
  },
  {
    "url": "/_nuxt/b0b85f91e6659a9bd173.js",
    "revision": "bd7d576317d417e462b2985274bf030d"
  },
  {
    "url": "/_nuxt/b474b699632bcd49640c.js",
    "revision": "3a099b80d54ec15b5e52fedd154b2386"
  },
  {
    "url": "/_nuxt/c5470d2014f27ed4b775.js",
    "revision": "474710855acee2eeefc3aed9bedabc34"
  },
  {
    "url": "/_nuxt/e53419ae7ce3aa47cdcf.js",
    "revision": "40cb48685646036c56fea3cbb4e9bf9a"
  },
  {
    "url": "/_nuxt/f9ac92aa87d9cb92d985.js",
    "revision": "ea07f25ea86691dec04afc093ed0b964"
  },
  {
    "url": "/_nuxt/fa82316256df424fcc91.js",
    "revision": "eacdbc7765d3eeff554e92e7827dab05"
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
