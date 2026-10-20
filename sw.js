const CACHE = 'lujianji-v139';
const ASSETS = ['./lujianji_v139.html', './lujianji_v138.html', './lujianji_v136.html', './lujianji_v135.html', './lujianji_v134.html', './lujianji_v133.html', './lujianji_v132.html', './lujianji_v131.html', './lujianji_v130.html', './lujianji_v129.html', './lujianji_v128.html', './lujianji_v127.html', './lujianji_v126.html', './lujianji_v125.html', './lujianji_v124.html', './lujianji_v123.html', './lujianji_v122.html', './lujianji_v121.html', './lujianji_v120.html', './lujianji_v119.html', './lujianji_v118.html', './lujianji_v117.html', './lujianji_v116.html', './lujianji_v115.html', './lujianji_v114.html', './lujianji_v109.html', './lujianji_v108.html', './lujianji_v107.html', './lujianji_v106.html', './lujianji_v105.html', './lujianji_v4.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png', './icon.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).then(function(res){
        var cp = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, cp); });
        return res;
      }).catch(function(){ return caches.match('./lujianji_v4.html'); });
    })
  );
});
