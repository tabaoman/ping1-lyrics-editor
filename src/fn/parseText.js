import LanguageDetect from 'languagedetect';
const ld = new LanguageDetect();
ld.setLanguageType('iso2');

function parseLine (line) {
  line = line.replace(/\r/, '');
  return { ts: 0, text: line }
}

function parseText (text) {
  const lyrics = [];
  const lang = ld.detect(text)[0][0];
  const seg = new Intl.Segmenter(lang, { granularity: 'sentence' });
  for (const line of text.split("\n")) {
    for (const sentence of Array.from(seg.segment(line), s => s.segment)) {
      lyrics.push(parseLine(sentence));
    }
  }
  return lyrics;
}

export default parseText;
