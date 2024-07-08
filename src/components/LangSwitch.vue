<template>
  <q-btn v-if="dense" flat round icon="translate">
    <q-menu>
      <q-list dense separator>
        <q-item v-for="l in langs" :key="l.value" clickable @click="lang = l.value" v-close-popup>
          <q-item-section>
            <q-item-label>{{ l.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <q-select v-else dense filled options-dense emit-value map-options v-model="lang" :options="langs">
    <template v-slot:prepend>
      <q-icon name="translate" />
    </template>
  </q-select>
</template>

<script setup>
import { Quasar } from "quasar";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import languages from 'quasar/lang/index.json';
import langList from '../i18n/index';
const langs = languages.filter(lang =>
  Object.keys(langList).includes(lang.isoName)
).map(lang => ({
  label: lang.nativeName, value: lang.isoName
}));

const props = defineProps({
  dense: { type: Boolean }
});
const { locale } = useI18n();
const lang = ref(Quasar.lang.isoName || 'en-US');

watch(lang, val => {
  locale.value = val;
});
</script>

<style scoped>

</style>
