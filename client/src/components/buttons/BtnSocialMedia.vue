<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  tooltip: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <Button
    text
    plain
    rounded
    :icon="icon"
    iconClass="text-2xl"
    class="w-3rem h-3rem hover:text-color"
    v-tooltip.bottom="tooltip"
  />
</template>
