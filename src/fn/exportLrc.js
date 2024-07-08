

function ts2Text (t) {
  const s = parseInt(t / 1000);
  return `${parseInt(s / 60)}`.padStart(2, '0') + ':' + `${s % 60}`.padStart(2, '0') + '.' + `${t % 1000}`.padStart(3, '0');
}

function exportLrc (lyrics) {
  return lyrics.map(l => `[${ts2Text(l.ts)}]${l.text}`).join("\r\n");
}


export default exportLrc;
