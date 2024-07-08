<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Lyrics Editor Online&nbsp;&nbsp;<span class="text-caption">{{ $t('text.subtitle') }}</span>
        </q-toolbar-title>
        <q-space />
        <a href="https://www.buymeacoffee.com/tabaoman" target="_blank" class="row items-center"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coke&slug=tabaoman&button_colour=FFDD00&font_colour=ff0000&font_family=Cookie&outline_colour=ff0000&coffee_colour=000000" /></a>
        <q-btn dense flat type="a" target="_blank" icon="img:/brands/github.png" href="https://github.com/tabaoman/ping1-lyrics-editor" />
        <q-btn dense flat type="a" target="_blank" icon="img:/brands/x.png" href="https://x.com/tabaoman" />
        <q-separator vertical class="q-mx-sm"/>
        <q-btn dense flat icon="info" @click="showInfo = true" />
        <q-btn dense flat icon="keyboard" @click="showHotkey = true" />
        <LangSwitch dense class="text-white" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showInfo">
      <q-card class="non-selectable">
        <q-card-section>
          <div class="text-h6">{{ $t('guide.title') }}</div>
          <div style="font-size:18px;" v-html="$t('guide.text')" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showHotkey">
      <q-card class="non-selectable">
        <q-card-section>
          <div class="text-h6">{{ $t('shortcut.title') }}</div>
          <div v-html="$t('shortcut.text')" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script setup>
import { ref } from "vue";
import LangSwitch from "components/LangSwitch.vue";

const showInfo = ref(false);
const showHotkey = ref(false);
</script>
