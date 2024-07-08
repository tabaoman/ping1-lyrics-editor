const pattern = /^\[[0-9]{2}:[0-9]{2}.([0-9]{2})|([0-9]{3})]/;
const matches = /(\[[0-9]{2}:[0-9]{2}.[0-9]{2}])|(\[[0-9]{2}:[0-9]{2}.[0-9]{3}])/;

function ts (ts) {
  if (ts.startsWith('[')) ts = ts.substring(1);
  if (ts.endsWith(']')) ts = ts.substring(0, ts.length - 1);
  const m = parseInt(ts.substring(0, 2)) * 60;
  const s = parseInt(ts.substring(3, 5));
  const ms = parseInt(ts.substring(6).padEnd(3, '0'));
  return (m + s) * 1000 + ms;
}

function parseLine (line) {
  line = line.replace(/\r/, '');
  if (pattern.test(line)) {
    const t = line.match(matches);
    return { ts: ts(t[0]), text: line.substring(t[0].length) }
  }
  return { ts: 0, text: '' }
}

function parseLrc (text) {
  const lyrics = [];
  for (const line of text.split("\n")) {
    lyrics.push(parseLine(line));
  }
  return lyrics;
}

export default parseLrc;
