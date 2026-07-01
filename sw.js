const CACHE_NAME = 'timematch-v4'; // ✨ バージョンをv4に上げて更新を認識させます
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './img/icon.png'
];

// インストール時にファイルをキャッシュに保存
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    // 🆕 新しいサービスワーカーが待機せず、すぐにアクティブになるように強制する
    self.skipWaiting();
});

// オフライン時でもキャッシュからページを表示
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
