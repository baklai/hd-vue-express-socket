<script setup></script>

<template>
  <i v-badge.success="0" class="p-overlay-badge">
    <Button
      text
      plain
      rounded
      icon="pi pi-bell"
      iconClass="text-3xl"
      class="w-3rem h-3rem hover:text-color"
      v-tooltip.bottom="$t('Notifications')"
    />
  </i>
</template>

<style scoped>
::v-deep(.p-badge.p-component) {
  top: 6px;
  right: 6px;
}
</style>
