const CACHE_NAME = 'timematch-v3'; // ✨ キャッシュバージョンをv3に上げて更新を強制します
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json', // ✨ ここを追加しました
    './img/icon.png'
];

// インストール時にファイルをキャッシュに保存
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting(); // 新しいバージョンにすぐ切り替える
});

// オフライン時でもキャッシュからページを表示
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});