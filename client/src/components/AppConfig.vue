<script setup>
import { ref } from 'vue';
import { useConfig } from '@/stores/config';

const Config = useConfig();

const visible = ref(false);

const scales = ref([12, 13, 14, 15, 16]);

const incrementScale = () => {
  Config.scale++;
};

const decrementScale = () => {
  Config.scale--;
};
</script>

<template>
  <button
    type="button"
    class="layout-config-button p-link"
    v-tooltip.left="$t('HD Options')"
    @click="visible = !visible"
  >
    <i class="pi pi-cog"></i>
  </button>

  <Sidebar
    v-model:visible="visible"
    position="right"
    :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
    class="layout-config-sidebar w-30rem"
  >
    <template #header>
      <div class="flex align-content-center w-25rem">
        <div class="flex align-items-center justify-content-center mr-2">
          <i class="pi pi-cog inline-block text-2xl" />
        </div>
        <div class="flex align-items-center justify-content-center">
          <p class="inline-block text-2xl">{{ $t('HD Options') }}</p>
        </div>
      </div>
    </template>

    <Divider />

    <div class="flex my-3">
      <div class="flex-1">
        <h5 class="flex align-items-center h-full">{{ $t('Scale') }}</h5>
      </div>
      <div class="flex flex-1 align-items-center justify-content-between">
        <Button
          icon="pi pi-minus"
          type="button"
          @click="decrementScale"
          class="p-button-text p-button-rounded p-button-plain w-2rem h-2rem mr-2"
          :disabled="Config.scale === scales[0]"
        />
        <div class="flex gap-2 align-items-center">
          <i
            class="pi pi-circle-fill text-300"
            v-for="item in scales"
            :key="item"
            :class="{ 'text-primary-500': item === Config.scale }"
          ></i>
        </div>
        <Button
          icon="pi pi-plus"
          type="button"
          pButton
          @click="incrementScale"
          class="p-button-text p-button-rounded p-button-plain w-2rem h-2rem ml-2"
          :disabled="Config.scale === scales[scales.length - 1]"
        />
      </div>
    </div>

    <Divider />

    <div class="flex my-3">
      <div class="flex-1">
        <h5 class="flex align-items-center h-full">{{ $t('Ripple Effect') }}</h5>
      </div>
      <div class="flex-1">
        <SelectButton v-model="Config.ripple" :options="[true, false]" aria-labelledby="single" />
      </div>
    </div>

    <Divider />

    <div class="flex my-3">
      <div class="flex-1">
        <h5 class="flex align-items-center h-full">{{ $t('Menu Type') }}</h5>
      </div>
      <div class="flex-1">
        <SelectButton v-model="Config.menuMode" :options="['static', 'overlay']" />
      </div>
    </div>

    <Divider />

    <div class="flex my-3">
      <div class="flex-1">
        <h5 class="flex align-items-center h-full">{{ $t('Input Style') }}</h5>
      </div>
      <div class="flex-1">
        <SelectButton v-model="Config.inputStyle" :options="['outlined', 'filled']" />
      </div>
    </div>

    <Divider />

    <div class="flex my-3">
      <div class="flex-1">
        <h5 class="flex align-items-center h-full">{{ $t('Themes style') }}</h5>
      </div>
      <div class="flex-1">
        <SelectButton v-model="Config.theme" :options="['light', 'dark']" />
      </div>
    </div>

    <Divider />

    <Button :label="$t('Set default options')" class="p-button-text w-full" />
  </Sidebar>
</template>

<style scoped>
::v-deep(.p-selectbutton > .p-button) {
  width: 50%;
}
</style>
