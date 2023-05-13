<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useTool } from '@/stores/api/tool';

const { t } = useI18n();
const toast = useToast();

const Tool = useTool();

const props = defineProps({
  host: { type: [String, Boolean], default: false }
});

const emits = defineEmits({
  view: ({ id }) => {
    if (id) return true;
    return false;
  },
  create: null,
  edit: ({ id }) => {
    if (id) return true;
    return false;
  },
  delete: ({ id }) => {
    if (id) return true;
    return false;
  }
});

defineExpose({
  toggle: (event, data) => {
    record.value = data;
    refMenu.value.toggle(event);
  }
});

const record = ref();

const refMenu = ref();

const options = computed(() => [
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
  },
  ...(props?.host
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
    : [])
]);

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
  const file = await Tool.getRDP(host);
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
  const file = await Tool.getVNC(host);
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
    const ping = await Tool.getPING(host);
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
  <Menu ref="refMenu" popup :model="options" class="py-0">
    <template #start>
      <div class="flex justify-content-center border-round-top mb-2"></div>
    </template>
    <template #end v-if="host">
      <div class="flex justify-content-center surface-ground border-round-bottom py-2 mt-2">
        <span class="font-bold"> {{ record[host] }} </span>
      </div>
    </template>
  </Menu>
</template>
