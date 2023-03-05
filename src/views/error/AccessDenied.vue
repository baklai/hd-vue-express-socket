<template>
  <div class="container">
    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
      <div class="grid flex flex-column align-items-center">
        <h1 class="text-900 text-yellow-500 font-bold text-4xl lg:text-5xl mb-2">Access Denied</h1>
        <span class="text-600 mb-5">You do not have the necessary permisions.</span>
        <img src="/img/403-light.webp" alt="Access denied" class="mb-5" width="280" />
        <div class="col-12 mt-5 text-center">
          <i class="pi pi-arrow-left text-yellow-500 mr-2" style="vertical-align: center"></i>
          <router-link to="/" class="text-yellow-500">Go to Dashboard</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 56px;
  padding: 0.3rem;
  background: linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%);
}
</style>
