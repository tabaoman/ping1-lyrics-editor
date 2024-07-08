export default {
  btn: {
    addAudio: '导入音频',
    addLrc:   '导入LRC',
    addText:  '导入文本',
  },
  btnHints: {
    editLine: '编辑当前行<br>热键: <span class="mac-key">e</span>',
    download: '下载LRC文件',
    insertLine: '插入新行到下面<br>热键: <span class="mac-key">i</span>',
    margeLines: '与下一行合并<br>Hotkey: <span class="mac-key">m</span>',
    removeLine: '删除当前行<br>热键: <span class="mac-key">d</span>',
    textImport: '编辑器会把文本分割成句子',
  },
  guide: {
    title: '操作指南',
    text: '<ol>' +
      '<li>导入音频和LRC文件（或文本文件）</li>' +
      '<li>播放音频，指针时间开始</li>' +
      '<li>点击按钮打时间戳</li>' +
      '<li>学习热键了解更多</li>' +
      '</ol>'
  },
  shortcut: {
    title: '热键列表',
    text: '<div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">↓</span>&nbsp;&nbsp;播放/暂停音频</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">←</span>&nbsp;&nbsp;向前 5 秒</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">→</span>&nbsp;&nbsp;向后 5 秒</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-space">&nbsp;</span>&nbsp;&nbsp;记录时间</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">↑</span>&nbsp;&nbsp;回到上一行</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">e</span>&nbsp;&nbsp;编辑当前行</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">↵</span>&nbsp;&nbsp;提交当前行编辑</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">i</span>&nbsp;&nbsp;插入新行</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">m</span>&nbsp;&nbsp;与下一行合并</div>' +
      '<div class="row items-center q-my-xs"><span class="mac-key">d</span>&nbsp;&nbsp;删除当前行</div>' +
      '</div>'
  },
  msg: {
    confirmOverwriteText: '覆盖当前载入的歌词?'
  },
  text: {
    speed: '<strong>{0}</strong> 字每分钟'
  }
}
