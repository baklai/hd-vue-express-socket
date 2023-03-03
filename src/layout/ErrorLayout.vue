<template>
  <main class="bg-app surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.bg-app {
  background-image: url('/img/bg-app.webp');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.content {
  border-radius: 56px;
  padding: 0.3rem;
  background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);
}
</style>
