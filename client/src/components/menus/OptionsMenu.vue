<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useTool } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
const store = useTool();

const props = defineProps({
  host: String
});

const emits = defineEmits({
  view: ({ id }) => {
    if (id) {
      return true;
    } else {
      return false;
    }
  },
  create: null,
  edit: ({ id }) => {
    if (id) {
      return true;
    } else {
      return false;
    }
  },
  delete: ({ id }) => {
    if (id) {
      return true;
    } else {
      return false;
    }
  }
});

defineExpose({
  toggle: (event, data) => {
    record.value = data;
    menu.value.toggle(event);
  }
});

const menu = ref();
const record = ref();

const options = computed(() => {
  const mainOptions = [
    {
      label: t('View record'),
      icon: 'pi pi-eye',
      command: () => emits('view', record.value)
    },
    {
      label: t('Create record'),
      icon: 'pi pi-plus-circle',
      command: () => emits('create', {})
    },
    {
      label: t('Edit record'),
      icon: 'pi pi-file-edit',
      command: () => emits('edit', record.value)
    },
    {
      label: t('Delete record'),
      icon: 'pi pi-trash',
      command: () => emits('delete', record.value)
    }
  ];

  const hostOptions = props.host
    ? [
        {
          label: t('Options'),
          items: [
            {
              label: t('ICMP Ping'),
              icon: 'pi pi-code',
              command: () => onPingHost(record.value[props.host])
            },
            {
              label: t('RDP Connect'),
              icon: 'pi pi-desktop',
              command: () => getRDPClient(record.value[props.host])
            },
            {
              label: t('VNC Connect'),
              icon: 'pi pi-desktop',
              command: () => getVNCClient(record.value[props.host])
            },
            {
              label: t('IP to clipboard'),
              icon: 'pi pi-copy',
              command: () => copyIPtoClipboard(record.value[props.host])
            }
          ]
        }
      ]
    : [];

  return [...mainOptions, ...hostOptions];
});

const copyIPtoClipboard = async (host) => {
  await navigator.clipboard.writeText(host);
  toast.add({
    severity: 'info',
    summary: t('HD Information'),
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
    summary: t('HD Information'),
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
    summary: t('HD Information'),
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
        severity: 'info',
        summary: t('Ping'),
        detail: '<pre>' + ping.output + '</pre>',
        life: 30000
      });
    }
  } catch (err) {
    toast.add({ severity: 'error', summary: t('Ping'), detail: t('Ping error'), life: 3000 });
  }
};
</script>

<template>
  <Menu ref="menu" popup :model="options" class="pb-0">
    <template #end v-if="host">
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
