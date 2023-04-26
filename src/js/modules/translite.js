import CyrillicToTranslit from 'cyrillic-to-translit-js';

const translit = (str) => {
  const cyrillicToTranslit = new CyrillicToTranslit();
  return cyrillicToTranslit.transform(str, '_').toLowerCase();
}

export default translit
