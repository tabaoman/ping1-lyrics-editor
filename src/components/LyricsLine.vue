<template>
  <div class="row items-start no-wrap lyrics-line" :class="now ? 'line-highlight' : ''">
    <div style="width: 131px;" v-if="current">
      {{ current }}
      <q-btn dense round color="black" icon="login" @click.stop="setTs" />
    </div>
    <div style="width: 131px;" v-else />
    <div style="width: 100px;" class="text-bold">[{{ ts2Text(ts) }}]</div>
    <form v-if="inEdit" class="lyrics-text" @submit="$emit('exit-edit')">
      <q-input dense autofocus outlined v-model="text" @blur="$emit('exit-edit')">
        <template v-slot:append>
          <q-btn dense icon="check" @click="$emit('exit-edit')" />
        </template>
      </q-input>
      <input hidden type="submit" />
    </form>
    <div v-else class="lyrics-text">{{ text }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const text = defineModel('text');
const props = defineProps({
  now: { type: Boolean },
  inEdit: { type: Boolean },
  cur: { type: Number },
  ts: { type: Number },
  set: { type: Function }
});

const setTs = () => {
  props.set(props.cur);
}
const ts2Text = (t) => {
  const s = parseInt(t / 1000);
  return `${parseInt(s / 60)}`.padStart(2, '0') + ':' + `${s % 60}`.padStart(2, '0') + '.' + `${t % 1000}`.padStart(3, '0');
}

const current = computed(() => {
  if (!props.now) return '';
  return ts2Text(props.cur);
});
</script>

<style scoped lang="sass">
.line-highlight
  color: white
  background-color: #1976d26e
.lyrics-line
  font-size: 20px
  cursor: pointer
  padding: 8px
.lyrics-line:hover
  background-color: lightgray
.lyrics-text
  width: calc(100% - 223px)
  padding-left: 8px
</style>
