importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/06712df382ac6f8c32ad.js",
    "revision": "188c52e3fd4e51201430f2dde78556ea"
  },
  {
    "url": "/_nuxt/09e7417874119e090534.js",
    "revision": "82a3ac7350c84bccbf7c65277fd85faa"
  },
  {
    "url": "/_nuxt/11f8d9063bac75a7214f.js",
    "revision": "50d3b51aef90a35f2607e3d057bc25d5"
  },
  {
    "url": "/_nuxt/14ea0be8a75385727366.js",
    "revision": "6e97d36a62f3b6cf9c02190c114a5c84"
  },
  {
    "url": "/_nuxt/2df4eb4a91348298411e.js",
    "revision": "4540ae7d4b0f8ae32a99ee72189c0ac1"
  },
  {
    "url": "/_nuxt/39c054e36c2abf199e58.js",
    "revision": "1df3d821d20498cc71374fc07eb10f21"
  },
  {
    "url": "/_nuxt/4f79221db95de8b4ed9d.js",
    "revision": "8b22a0e62a5c504b53cfd1d3d767dbdd"
  },
  {
    "url": "/_nuxt/60a0c6526eccf1c7ece2.js",
    "revision": "5a482f7ee40d8f27eacdb838d5656461"
  },
  {
    "url": "/_nuxt/7dbc2851c8a3ddc2a19c.js",
    "revision": "177140872dbc81f512799a2b800f36a5"
  },
  {
    "url": "/_nuxt/975dae7bd3e337ae99b1.js",
    "revision": "eb073f70e630a1c9d045ba08b685b7e8"
  },
  {
    "url": "/_nuxt/9ba4d197c84432e86b7d.js",
    "revision": "05bbb068ab836f5b54946acbb792077a"
  },
  {
    "url": "/_nuxt/a5b4fd67a200d8a0816a.js",
    "revision": "821fc31b83613cbb63c2d50002ef224c"
  },
  {
    "url": "/_nuxt/b09b4fc9d6762949dd1d.js",
    "revision": "cfd05d12421c4144db39d666c4d3ee9e"
  },
  {
    "url": "/_nuxt/c15df54f33cb97b6ccb7.js",
    "revision": "033494e102e71ea2b23f668c1d9deac1"
  },
  {
    "url": "/_nuxt/c2f000ebc543bab6cf22.js",
    "revision": "61181011305aa93fe26f3a7e326e0a5e"
  },
  {
    "url": "/_nuxt/c369d5d6ad46dc338bd5.js",
    "revision": "2a09bf36a790cc8120abfc8cdd776e07"
  },
  {
    "url": "/_nuxt/cf2212a9b67d718b6b5c.js",
    "revision": "3587813a2a21ac955c0ea5aa5dafde63"
  },
  {
    "url": "/_nuxt/d0b312a643f2e4f8643e.js",
    "revision": "e252baf8c3a58256f92525a4b877022a"
  },
  {
    "url": "/_nuxt/e3e462392ce8a5e7843e.js",
    "revision": "d8abfbf0aab99ff7b382d7623a9efcff"
  },
  {
    "url": "/_nuxt/efa83111e9491797e70c.js",
    "revision": "3f1437202b011a97a326f4da849b75b0"
  },
  {
    "url": "/_nuxt/f4ef4c1dfb333acfd153.js",
    "revision": "0c8d8206931701f184272e80990bfdcf"
  },
  {
    "url": "/_nuxt/f6d32461dd27875eeb50.js",
    "revision": "c8131e901d741b05564c2c67c78be562"
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
