<script setup>
import AppWelcome from '@/components/AppWelcome.vue';
</script>

<template>
  <div class="background-app flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="flex">
        <div class="flex align-items-center justify-content-center">
          <AppWelcome />
        </div>

        <Divider layout="vertical" class="hidden md:block mx-6" />

        <main class="w-30rem">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-app {
  background-image: url('/img/bg-app.webp');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
