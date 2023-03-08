<script setup>
import { ref, onMounted } from 'vue';
import { useConfigStore } from '@/stores/appconf';
import { useCloud } from '@/stores/restfullapi';

const config = useConfigStore();
const API = useCloud();

const nodes = ref([]);
const expandedKeys = ref({});

onMounted(async () => {
  const data = await API.findAll({});
  nodes.value = initNodesList(data);
});

const initNodesList = (arr, key = '') => {
  if (!arr?.length) return null;
  return arr.map((item, index) => {
    return {
      key: key.length ? `${key}-${index}` : `${index}`,
      label: item.name,
      type: item.type,
      size: item.size,
      data: item.path,
      icon: item.type === 'directory' ? 'pi pi-folder' : 'pi pi-file',
      children: initNodesList(item.children, key.length ? `${key}-${index}` : `${index}`)
    };
  });
};

const expandNode = (node) => {
  expandedKeys.value[node.key] = true;
  if (node.children && node.children.length) {
    for (let child of node.children) {
      expandNode(child);
    }
  }
};

const expandAll = () => {
  for (let node of nodes.value) {
    expandNode(node);
  }
  expandedKeys.value = { ...expandedKeys.value };
};

const collapseAll = () => {
  expandedKeys.value = {};
};

const copyToClipboard = (value) => {
  navigator.clipboard.writeText(value);
};

const byteFormat = (value) => {
  if (!value) return '0 kB';
  const index = Math.floor(Math.log(value) / Math.log(1024));
  return (value / Math.pow(1024, index)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GiB', 'TB'][index];
};
</script>

<template>
  <Dialog maximizable header="HD File Hosting" v-model:visible="config.cloud" :contentStyle="{ height: '400px' }" :style="{ minWidth: '30vw' }">
    <template #header>
      <div class="flex align-content-center flex-wrap">
        <div class="flex align-items-center justify-content-center mr-3">
          <i class="pi pi-cloud-upload" style="font-size: 3rem"></i>
        </div>
        <div class="flex align-items-center justify-content-center mr-4">
          <div class="flex flex-column">
            <h5 class="mb-0">HD File Hosting</h5>
            <p>File hosting of the technical support department</p>
          </div>
        </div>
      </div>
    </template>

    <Tree filter :value="nodes" v-model:expandedKeys="expandedKeys" filterMode="lenient" scrollHeight="flex">
      <template #default="slotProps">
        <div>
          <p class="font-bold">{{ slotProps.node.label }}</p>
        </div>
      </template>
      <template #file="slotProps">
        <div class="flex justify-content-between flex-wrap w-full">
          <div class="flex align-items-center justify-content-center mr-2">
            <p class="text-color my-0">{{ slotProps.node.label }}</p>
          </div>
          <div class="flex align-items-center justify-content-center">
            <p class="my-0 mr-2">file size: {{ byteFormat(slotProps.node.size) }}</p>
            <Button
              type="button"
              icon="pi pi-copy"
              iconClass="text-2xl"
              class="p-button-text p-button-rounded p-button-plain text-green-300 mx-2"
              @click="copyToClipboard(slotProps.node.data)"
              v-tooltip.bottom="'Copy url to clipboard'"
            />
            <a
              download
              type="button"
              :href="slotProps.node.data"
              class="p-button p-button-text p-button-rounded p-button-plain text-green-300"
              v-tooltip.bottom="'Download file'"
            >
              <i class="pi pi-download" style="font-size: 1.3rem"></i>
            </a>
          </div>
        </div>
      </template>
    </Tree>

    <template #footer>
      <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-center">
          <Button type="button" icon="pi pi-plus" label="Expand All" class="p-button-text p-button-plain" @click="expandAll" />
          <Button type="button" icon="pi pi-minus" label="Collapse All" class="p-button-text p-button-plain" @click="collapseAll" />
        </div>
        <div class="flex align-items-center justify-content-center">
          <Button type="button" icon="pi pi-times" label="Close" class="p-button-text p-button-plain" @click="config.cloud = !config.cloud" />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
::v-deep(.p-treenode-label) {
  width: 100%;
}
</style>
