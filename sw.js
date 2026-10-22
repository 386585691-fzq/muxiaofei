const CACHE = 'lujianji-v178';
const ASSETS = ['./lujianji_v178.html', './lujianji_v177.html', './lujianji_v176.html', './lujianji_v175.html', './lujianji_v173.html', './lujianji_v172.html', './lujianji_v171.html', './lujianji_v167.html', './lujianji_v166.html', './lujianji_v165.html', './lujianji_v164.html', './lujianji_v163.html', './lujianji_v162.html', './lujianji_v161.html', './lujianji_v160.html', './lujianji_v159.html', './lujianji_v158.html', './lujianji_v157.html', './lujianji_v156.html', './lujianji_v155.html', './lujianji_v154.html', './lujianji_v153.html', './lujianji_v152.html', './lujianji_v151.html', './lujianji_v149.html', './lujianji_v148.html', './lujianji_v147.html', './lujianji_v146.html', './lujianji_v145.html', './lujianji_v144.html', './lujianji_v143.html', './lujianji_v142.html', './lujianji_v141.html', './lujianji_v140.html', './lujianji_v139.html', './lujianji_v138.html', './lujianji_v136.html', './lujianji_v135.html', './lujianji_v134.html', './lujianji_v133.html', './lujianji_v132.html', './lujianji_v131.html', './lujianji_v130.html', './lujianji_v129.html', './lujianji_v128.html', './lujianji_v127.html', './lujianji_v126.html', './lujianji_v125.html', './lujianji_v124.html', './lujianji_v123.html', './lujianji_v122.html', './lujianji_v121.html', './lujianji_v120.html', './lujianji_v119.html', './lujianji_v118.html', './lujianji_v117.html', './lujianji_v116.html', './lujianji_v115.html', './lujianji_v114.html', './lujianji_v109.html', './lujianji_v108.html', './lujianji_v107.html', './lujianji_v106.html', './lujianji_v105.html', './lujianji_v4.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png', './icon.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
// network-first：始终优先拿最新版，离线才回退缓存
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(res){
      if (res && res.status === 200) {
        var cp = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, cp); });
      }
      return res;
    }).catch(function(){
      return caches.match(e.request).then(function(r){
        return r || caches.match('./lujianji_v178.html').then(function(r2){ return r2 || caches.match('./lujianji_v4.html'); });
      });
    })
  );
});
