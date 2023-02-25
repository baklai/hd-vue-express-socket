<template>
  <div class="bg-app surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="content">
        <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
          <div class="grid flex flex-column align-items-center">
            <h1 class="text-900 font-bold text-4xl lg:text-5xl mb-2">Not Found</h1>
            <span class="text-600 mb-5">Requested resource is not available.</span>
            <img src="/img/404-light.webp" alt="Access denied" class="mb-5" width="280" />
            <div class="col-12 mt-5 text-center">
              <i class="pi pi-arrow-left text-blue-500 mr-2" style="vertical-align: center"></i>
              <router-link to="/" class="text-blue-500">Go to Dashboard</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
