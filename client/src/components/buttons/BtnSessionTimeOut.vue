<script setup>
import { ref } from 'vue';
import { useHelpdesk } from '@/stores/helpdesk';

const Helpdesk = useHelpdesk();
</script>

<template>
  <Button
    text
    plain
    rounded
    icon="pi pi-circle"
    style="
      font-size: 0.9rem;
      background: transparent;
      border: 2px solid var(--text-color-secondary);
      width: 1.85rem;
      height: 1.85rem;
    "
    v-tooltip.bottom="$t('Time out')"
  >
    {{ Helpdesk.timeout }}
  </Button>
</template>
