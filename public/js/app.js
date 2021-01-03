const versionNum = '1.0.1';

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js')
    .then((reg) => console.log('service worked registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}