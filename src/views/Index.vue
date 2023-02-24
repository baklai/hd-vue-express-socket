<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig, contextPath } = useLayout();

const smoothScroll = (id) => {
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth'
  });
};

const logoUrl = computed(() => {
  return `${contextPath}img/${layoutConfig.darkTheme.value ? 'logo-app' : 'logo-app'}.webp`;
});
</script>

<template>
  <div class="col-12">
    <div class="card h-full">
      <h5>Vertical with Content</h5>
      <div class="grid">
        <div class="col-5 flex align-items-center justify-content-center">
          <div class="p-fluid">
            <div class="field">
              <label for="username">Username</label>
              <InputText id="username" type="text" />
            </div>
            <div class="field">
              <label for="password">Password</label>
              <InputText id="password" type="password" />
            </div>
            <Button label="Login"></Button>
          </div>
        </div>
        <div class="col-2">
          <Divider layout="vertical">
            <b>OR</b>
          </Divider>
        </div>
        <div class="col-5 flex align-items-center justify-content-center">
          <Button label="Sign Up" icon="pi pi-user-plus" class="p-button-success"></Button>
        </div>
      </div>
    </div>
  </div>
</template>
