const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Browser anda mendukung service worker');
    return;
  }

  try {
    await navigator.serviceWorker.register('./sw.bundle.js');
    console.log('Registrasi service worker');
  } catch (error) {
    console.log('Gagal untuk registrasi service worker', error);
  }
};

export default swRegister;
