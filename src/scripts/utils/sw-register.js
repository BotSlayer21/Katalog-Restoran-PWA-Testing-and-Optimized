import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Browser anda tidak mendukung service worker');
    return;
  }
  const wb = new Workbox('./sw.bundle.js');
  try {
    await wb.register();
    // await navigator.serviceWorker.register('./sw.bundle.js');
    console.log('Registrasi service worker');
  } catch (error) {
    console.log('Gagal untuk registrasi service worker', error);
  }
};

export default swRegister;
