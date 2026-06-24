const CACHE_NAME = 'timematch-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './img/icon.png' // ✨ 末尾にコンマを忘れずに、この1行を追加します
];

// インストール時にファイルをキャッシュに保存
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// オフライン時でもキャッシュからページを表示
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});