import CyrillicToTranslit from 'cyrillic-to-translit-js';

const translit = (str) => {
  const cyrillicToTranslit = new CyrillicToTranslit();
  let replaseStr = str.replace(/[^A-Za-zА-Яа-я0-9\s]/g, ' ').replace(/\s+/g, ' ')
  return cyrillicToTranslit.transform(replaseStr, '-').toLowerCase();
}

export default translit
