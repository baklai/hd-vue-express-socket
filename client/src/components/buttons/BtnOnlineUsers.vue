<script setup></script>

<template>
  <i v-badge.success="$helpdesk?.users?.length" class="p-overlay-badge">
    <Button
      text
      plain
      rounded
      icon="pi pi-users"
      iconClass="text-3xl"
      class="w-3rem h-3rem hover:text-color"
      v-tooltip.bottom="$t('Online users')"
    />
  </i>
</template>

<style scoped>
::v-deep(.p-badge.p-component) {
  top: 6px;
  right: 6px;
}
</style>
