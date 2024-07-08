<template>
  <q-page padding class="column">
    <div class="row no-wrap items-center">
      <FileUpload flat :label="$t('btn.addLrc')" icon="article" accept=".lrc" v-model="lrc" />
      <FileUpload flat :label="$t('btn.addText')" icon="article" accept="text/*" v-model="text">
        <q-tooltip><div v-html="$t('btnHints.textImport')" /></q-tooltip>
      </FileUpload>
      <q-separator vertical class="q-mx-sm" />
      <q-btn dense flat color="red" icon="delete" @click="reset" />
      <q-btn dense flat icon="edit_note" @click="edit">
        <q-tooltip><div v-html="$t('btnHints.editLine')"/></q-tooltip>
      </q-btn>
      <q-btn dense flat icon="playlist_add" @click="insert">
        <q-tooltip><div v-html="$t('btnHints.insertLine')"/></q-tooltip>
      </q-btn>
      <q-btn dense flat color="red" icon="playlist_remove" @click="remove">
        <q-tooltip><div v-html="$t('btnHints.removeLine')"/></q-tooltip>
      </q-btn>
      <q-separator vertical class="q-mx-sm" />
      <q-btn dense flat icon="merge" style="transform: rotate(90deg);" @click="merge">
        <q-tooltip><div v-html="$t('btnHints.margeLines')"/></q-tooltip>
      </q-btn>
      <q-separator vertical class="q-mx-sm" />
      <q-btn dense flat :disable="!lyrics || lyrics.length === 0" icon="file_download" @click="download">
        <q-tooltip><div v-html="$t('btnHints.download')"/></q-tooltip>
      </q-btn>
    </div>
    <div class="col-grow q-mb-xl">
      <LyricsLine v-for="(line, i) in lyrics" :key="`lrc-${i}`" :id="`lrc-${i}`"
                  :in-edit="editIdx === i"
                  :now="selected === i" :cur="cur" :class="i === selected - 1 ? 'last-highlight' : ''"
                  :ts="line.ts" v-model:text="line.text" @click="selected = i" :set="set" @exit-edit="editIdx = -1" />
    </div>

    <q-dialog seamless :model-value="true" position="bottom">
      <q-card style="width:100vh;border-radius: 30px;">
        <div class="row items-center no-wrap">
          <FileUpload flat rounded :label="$t('btn.addAudio')" icon="music_note" accept="audio/*" style="height:54px;" v-model="audio" />
          <audio class="col-grow" ref="audioRef" controls :src="audioData"
                 @playing="playing = true" @timeupdate="evt => cur = parseInt(evt.target.currentTime * 1000)" />
        </div>
      </q-card>
    </q-dialog>

    <q-page-sticky position="top-right" :offset="[16, 24]">
      <q-card style="border-radius: 60px;">
        <div class="q-pa-sm" v-html="speed" />
      </q-card>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[16, 16]">
      <q-btn round :disable="!lyrics || lyrics.length === 0" icon="file_download" @click="download">
        <q-tooltip><div v-html="$t('btnHints.download')"/></q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import parseLrc from '../fn/parseLrc';
import parseText from '../fn/parseText';
import exportLrc from '../fn/exportLrc';
import countSpeed from '../fn/countSpeed';
import FileUpload from "components/FileUpload.vue";
import LyricsLine from "components/LyricsLine.vue";

const { t } = useI18n();
const cur = ref(0);
const lrc = ref(null);
const text = ref(null);
const audio = ref(null);
const audioRef = ref(null);
const editIdx = ref(-1);
const selected = ref(0);
const playing = ref(false);
const audioData = computed(() => {
  if (!audio.value) return null;
  return URL.createObjectURL(audio.value);
})
const lyrics = ref(null);
const speed = computed(() => {
  let s = 0;
  if (!lyrics.value || lyrics.value.length === 0 || selected.value < 0 || selected.value >= lyrics.value.length || !audioRef.value.currentTime) {
  } else {
    s = countSpeed(lyrics.value, selected.value, audioRef.value.currentTime);
  }
  return `<strong>${s}</strong>` + ' ' + t('text.speed');
});

const key = (evt) => {
  evt.preventDefault();
  if (evt.key === ' ') {
    set();
  } else if (evt.key === 'd' || evt.key === 'D') {
    remove();
  } else if (evt.key === 'e' || evt.key === 'E') {
    edit();
  } else if (evt.key === 'm' || evt.key === 'M') {
    merge();
  } else if (evt.keyCode === 37) {
    audioRef.value.currentTime -= 5;
  } else if (evt.keyCode === 39) {
    audioRef.value.currentTime += 5;
  } else if (evt.keyCode === 38) {
    back();
  } else if (evt.keyCode === 40) {
    if (!audioRef.value) return;
    if (playing.value) {
      audioRef.value.pause();
      playing.value = false;
    } else {
      audioRef.value.play();
    }
  }
}
const set = () => {
  if (!lyrics.value[selected.value]) return;
  lyrics.value[selected.value].ts = cur.value;
  selected.value++;
}
const back = () => {
  if (selected.value <= 0) return;
  const t = lyrics.value[selected.value - 1].ts;
  audioRef.value.currentTime = t / 1000;
  selected.value--;
}
const edit = () => {
  editIdx.value = selected.value;
}
const merge = () => {
  if (!lyrics.value || lyrics.value.length === 0) return;
  if (selected.value < 0 || selected.value + 1 >= lyrics.value.length) return;
  if (!lyrics.value[selected.value].text)
    lyrics.value[selected.value].text = " "
  if (!lyrics.value[selected.value].text.endsWith(' '))
    lyrics.value[selected.value].text += ' ';
  lyrics.value[selected.value].text += lyrics.value[selected.value + 1].text;
  lyrics.value.splice(selected.value + 1, 1);
}
const insert = () => {
  if (!lyrics.value) return;
  lyrics.value.splice(selected.value, 0, { ts: 0, text: '' });
  edit();
}
const remove = () => {
  if (!lyrics.value) return;
  if (selected.value >= 0 && selected.value < lyrics.value.length)
    lyrics.value.splice(selected.value, 1);
};
const reset = () => {
  cur.value = 0;
  selected.value = 0;
  lyrics.value = [];
}
const download = () => {
  const res = exportLrc(lyrics.value);
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(res));
  element.setAttribute('download', 'lyrics.lrc');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

onMounted(() => {
  document.addEventListener('keydown', key);
});
watch(() => lrc.value, (v) => {
  if (lyrics.value && lyrics.value.length > 0) {
    if (!confirm(t('msg.confirmOverwriteText'))) return;
  }
  const fr = new FileReader();
  fr.addEventListener("loadend", function() {
    lyrics.value = parseLrc(fr.result);
  });
  fr.readAsText(v);
});
watch(() => text.value, (v) => {
  if (lyrics.value && lyrics.value.length > 0) {
    if (!confirm(t('msg.confirmOverwriteText'))) return;
  }
  const fr = new FileReader();
  fr.addEventListener("loadend", function() {
    lyrics.value = parseText(fr.result);
  });
  fr.readAsText(v);
});
watch(() => editIdx.value, (v) => {
  if (v >= 0) {
    document.removeEventListener('keydown', key);
  } else {
    document.addEventListener('keydown', key);
  }
});
watch(() => selected.value, (v) => {
  const line = document.getElementById(`lrc-${v}`);
  if (!line) return;
  window.scrollTo({ top: line.offsetTop - 250, behavior: 'smooth' });
});
</script>

<style scoped lang="sass">
.last-highlight
  color: white
  background-color: #9C27B06e
</style>
