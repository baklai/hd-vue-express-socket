<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useTool } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
const store = useTool();

const props = defineProps({
  isHost: {
    type: Boolean,
    default: false
  },
  hostField: {
    type: String,
    default: 'host'
  }
});

const $emit = defineEmits(['view', 'create', 'edit', 'delete']);

const menu = ref();
const record = ref();

defineExpose({
  toggle: (event, data) => {
    record.value = data;
    menu.value.toggle(event);
  }
});

const options = computed(() => {
  const mainOptions = [
    {
      label: t('View record'),
      icon: 'pi pi-eye',
      command: () => $emit('view', record.value)
    },
    {
      label: t('Create record'),
      icon: 'pi pi-plus-circle',
      command: () => $emit('create', {})
    },
    {
      label: t('Edit record'),
      icon: 'pi pi-file-edit',
      command: () => $emit('edit', record.value)
    },
    {
      label: t('Delete record'),
      icon: 'pi pi-trash',
      command: () => $emit('delete', record.value)
    }
  ];

  const hostOptions = props.isHost
    ? [
        {
          label: t('Options'),
          items: [
            {
              label: t('ICMP Ping'),
              icon: 'pi pi-code',
              command: () => onPingHost(record.value[props.hostField])
            },
            {
              label: t('RDP Connect'),
              icon: 'pi pi-desktop',
              command: () => getRDPClient(record.value[props.hostField])
            },
            {
              label: t('VNC Connect'),
              icon: 'pi pi-desktop',
              command: () => getVNCClient(record.value[props.hostField])
            },
            {
              label: t('IP to clipboard'),
              icon: 'pi pi-copy',
              command: () => copyIPtoClipboard(record.value[props.hostField])
            }
          ]
        }
      ]
    : [];

  return [...mainOptions, ...hostOptions];
});

const copyIPtoClipboard = (host) => {
  navigator.clipboard.writeText(host);
  toast.add({
    severity: 'info',
    summary: t('Copied to clipboard'),
    detail: t(`IP ${host} copied to clipboard`),
    life: 3000
  });
};

const getRDPClient = async (host) => {
  const file = await store.getRDP(host);
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `RDP_${host}.rdp`);
  toast.add({
    severity: 'info',
    summary: t('RDP File created'),
    detail: t('RDP File created'),
    life: 3000
  });
  link.click();
};

const getVNCClient = async (host) => {
  const file = await store.getVNC(host);
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `VNC_${host}.vnc`);
  toast.add({
    severity: 'info',
    summary: t('VNC File created'),
    detail: t('VNC File created'),
    life: 3000
  });
  link.click();
};

const onPingHost = async (host) => {
  try {
    toast.add({ severity: 'success', summary: t('Ping'), detail: t('Ping run'), life: 3000 });
    const ping = await store.getPING(host);
    if (ping) {
      toast.add({
        severity: 'success',
        summary: t('Ping'),
        detail: '<pre>' + ping.output + '</pre>',
        life: 10000
      });
    }
  } catch (err) {
    toast.add({ severity: 'error', summary: t('Ping'), detail: t('Ping error'), life: 3000 });
  }
};
</script>

<template>
  <Menu ref="menu" popup :model="options" class="pb-0">
    <template #end v-if="isHost">
      <div class="flex justify-content-center">
        <div
          class="flex align-items-center justify-content-center surface-ground border-round-bottom h-2rem w-full"
        >
          <span> IP {{ record[hostField] }} </span>
        </div>
      </div>
    </template>
  </Menu>
</template>
