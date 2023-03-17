<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useTool } from '@/stores/restfullapi';

const toast = useToast();
const API = useTool();

const props = defineProps({
  items: {
    type: Array,
    default: []
  }
});

const host = ref();
const menu = ref();

defineExpose({
  toggle: (event, value) => {
    host.value = value;
    menu.value.toggle(event);
  }
});

const options = computed(() => [
  ...props.items,
  {
    label: 'Options',
    items: [
      { label: 'ICMP Ping', icon: 'pi pi-code', command: () => onPingHost() },
      {
        label: 'RDP Connect',
        icon: 'pi pi-desktop',
        command: () => getRDPClient()
      },
      {
        label: 'VNC Connect',
        icon: 'pi pi-desktop',
        command: () => getVNCClient()
      },
      {
        label: 'IP to clipboard',
        icon: 'pi pi-copy',
        command: () => copyIPtoClipboard()
      }
    ]
  }
]);

const copyIPtoClipboard = () => {
  navigator.clipboard.writeText(host.value);
  toast.add({
    severity: 'info',
    summary: 'Copied to clipboard',
    detail: `IP ${host.value} copied to clipboard`,
    life: 3000
  });
};

const getRDPClient = async () => {
  const file = await API.getRDP(host.value);
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `RDP_${host.value}.rdp`);
  toast.add({
    severity: 'info',
    summary: 'RDP File created',
    detail: 'RDP File created',
    life: 3000
  });
  link.click();
};

const getVNCClient = async () => {
  const file = await API.getVNC(host.value);
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `VNC_${host.value}.vnc`);
  toast.add({
    severity: 'info',
    summary: 'VNC File created',
    detail: 'VNC File created',
    life: 3000
  });
  link.click();
};

const onPingHost = async () => {
  try {
    toast.add({ severity: 'success', summary: 'Ping', detail: 'Ping run', life: 3000 });
    const ping = await API.getPING(host.value);
    if (ping) {
      toast.add({
        severity: 'success',
        summary: 'Ping',
        detail: '<pre>' + ping.output + '</pre>',
        life: 10000
      });
    }
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Ping', detail: 'Ping error', life: 3000 });
  }
};
</script>

<template>
  <Menu ref="menu" popup :model="options" class="pb-0">
    <template #end>
      <div class="flex justify-content-center">
        <div
          class="flex align-items-center justify-content-center surface-ground border-round-bottom h-2rem w-full"
        >
          <span> IP {{ host }} </span>
        </div>
      </div>
    </template>
  </Menu>
</template>
