<template>
  <div>
    <q-btn no-caps :flat="flat" :rounded="rounded" class="full-height"
           :label="label || $t('btn.upload')" :icon="icon || 'file_upload'" @click.stop="add" />
    <q-file v-show="false" ref="fileRef" v-model="file" :accept="accept" />
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const model = defineModel();
const props = defineProps(['flat', 'rounded', 'icon', 'label', 'accept']);
const file = ref(null);
const fileRef = ref(null);

const add = () => {
  fileRef.value.pickFiles();
}
watch(() => file.value, (v) => {
  if (!v) return;
  model.value = v;
  fileRef.value.removeAtIndex(0);
});
</script>

<style scoped lang="sass">

</style>
