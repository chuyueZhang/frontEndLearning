console.log('加载main.js');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((ans) => console.log(`registed: ${ans}`))
      .catch((err) => {
        console.log(`register err: ${err}`);
      });
  });
}
