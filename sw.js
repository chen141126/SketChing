// 檔案名稱: sw.js
self.addEventListener('install', (e) => {
  self.skipWaiting(); // 強制更新
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim()); // 立即接管頁面
});

// 這是手機通知能夠運作的關鍵
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // 點擊通知時回到 APP
  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
