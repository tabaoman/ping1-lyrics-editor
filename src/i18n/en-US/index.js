export default {
  btn: {
    addAudio: 'Import Audio',
    addLrc:   'Import LRC',
    addText:  'Import Text',
  },
  btnHints: {
    editLine: 'Edit current line<br>Hotkey: <span class="mac-key">e</span>',
    download: 'Download LRC file',
    insertLine: 'Insert a new line<br>Hotkey: <span class="mac-key">i</span>',
    margeLines: 'Merge with the next line<br>Hotkey: <span class="mac-key">m</span>',
    offsetTime: 'Apply the offset to the all lines',
    removeLine: 'Remove current line<br>Hotkey: <span class="mac-key">d</span>',
    textImport: 'Editor will separate the text into sentences',
  },
  guide: {
    title: 'Guide',
    text: '<ol>' +
      '<li>Import audio and lrc file (or text file)</li>' +
      '<li>Play the audio and the cursor timer is running</li>' +
      '<li>Click buttons to make time tag</li>' +
      '<li>Learn hotkeys for more</li>' +
      '</ol>'
  },
  shortcut: {
    title: 'Shortcuts',
    text: '<div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">↓</span>&nbsp;&nbsp;Play/pause audio</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">←</span>&nbsp;&nbsp;5 seconds backward</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">→</span>&nbsp;&nbsp;5 seconds forward</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-space">&nbsp;</span>&nbsp;&nbsp;Make time tag</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">↑</span>&nbsp;&nbsp;Back to the last line</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">e</span>&nbsp;&nbsp;Edit current line</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">↵</span>&nbsp;&nbsp;Submit edit</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">i</span>&nbsp;&nbsp;Insert a new line</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">m</span>&nbsp;&nbsp;Merge with next line</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">d</span>&nbsp;&nbsp;Delete current line</div>' +
      '</div>'
  },
  msg: {
    confirmOverwriteText: 'Overwrite the existing lyrics?'
  },
  text: {
    offset: 'Offset (sec)',
    speed: ' word(s) per min',
    subtitle: 'Take it easy. Your data won\'t be uploaded.'
  }
}
