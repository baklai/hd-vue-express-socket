<script setup>
import BtnToggleLang from '@/components/buttons/BtnToggleLang.vue';
</script>

<template>
  <header class="flex">
    <div class="w-30rem h-auto">
      <div class="mb-8">
        <div class="flex align-items-stretch mb-6">
          <div class="flex align-items-center justify-content-center">
            <img src="/img/logo-app.webp" alt="HD logo" width="72" height="72" class="mr-4" />
          </div>
          <div>
            <h1 class="uppercase font-bold text-7xl m-0">Helpdesk</h1>
            <p class="text-xl line-height-2">Web Application of technical support</p>
          </div>
        </div>
        <p class="text-justify text-xl line-height-2 text-color-secondary">
          Helpdesk technical support is a type of customer service that provides assistance to
          customers who are having technical issues with their products or services.
        </p>
      </div>
      <nav class="flex">
        <Button
          label="Home"
          icon="pi pi-home"
          class="p-button-text p-button-plain mr-2"
          @click="$router.push('/')"
        />
        <Button
          label="Log In"
          icon="pi pi-sign-in"
          class="p-button-text p-button-plain mr-2"
          @click="$router.push('/auth/signin')"
        />
        <Button
          label="Sign Up"
          icon="pi pi-user-plus"
          class="p-button-text p-button-plain mr-2"
          @click="$router.push('/auth/signup')"
        />

        <Divider layout="vertical" class="mx-2" />

        <BtnToggleLang class="hover:text-color ml-2" label="Language" />
      </nav>
    </div>
  </header>
</template>
