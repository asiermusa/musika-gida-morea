
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.core.setCacheNameDetails({
  prefix: '__gidaMorea',
  suffix: 'v02'
});

const vbSyncPost = new workbox.backgroundSync.Plugin('asierito1', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
    callbacks: {
        queueDidReplay: async(storableRequestArray) => {
           // showNotification()
            console.log('callback post queue [queueDidReplay]', storableRequestArray[0].request.referrer)
            let dados = storableRequestArray[0].request.referrer;

            let message = {
                'status': 'executado',
                'identificacao': "postQueueAPI",
                'data' : dados
            };

            // emite notificação ao cliente window
            let clients = await self.clients.matchAll();
            for (const client of clients) {
                client.postMessage(message);
            }
        },
    }
});


workbox.routing.registerRoute(
     // new RegExp('https://api-production.vimbo.com.br/v1/*.*'),
     // new RegExp('https://api-production.vimbo.com.br/v1/*'),
     new RegExp('https://www.asiermusa.tk/gidamorea-jwt/.*'),
     workbox.strategies.networkOnly({
         plugins: [vbSyncPost]
     }),
     'POST'
 );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
