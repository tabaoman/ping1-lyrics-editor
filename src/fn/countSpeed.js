import LanguageDetect from 'languagedetect';
const ld = new LanguageDetect();
ld.setLanguageType('iso2');

function countSpeed (lyrics, idx, ts) {
  let cnt = 0;
  let seg = null;
  for (let i = 0; i < lyrics.length; i++) {
    if (i > idx) break;
    const t = lyrics[i].text;
    if (!seg) {
      const lang = ld.detect(t)[0][0];
      seg = new Intl.Segmenter(lang, { granularity: 'word' });
    }
    cnt += Array.from(seg.segment(t), s => s.segment).length;
  }
  return parseInt(cnt * 60 / ts);
}

export default countSpeed;
