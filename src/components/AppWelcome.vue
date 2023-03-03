<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const to = (to) => {
  router.push(to);
};
</script>

<template>
  <header class="flex">
    <div class="w-30rem">
      <div class="mb-4">
        <div class="flex align-items-center">
          <img alt="HD logo" class="mr-2 flex align-items-center" src="/img/logo-app.webp" width="32" height="32" />
          <h1 class="uppercase font-bold">Helpdesk</h1>
        </div>
        <p>Web Application of technical support</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, nulla?</p>
      </div>
      <nav class="flex">
        <Button label="Home" icon="pi pi-home" class="p-button-text p-button-plain mr-2" @click="to('/')" />
        <Button label="Log In" icon="pi pi-sign-in" class="p-button-text p-button-plain mr-2" @click="to('/auth/signin')" />
        <Button label="Sign Up" icon="pi pi-user-plus" class="p-button-text p-button-plain mr-2" @click="to('/auth/signup')" />
      </nav>
    </div>
  </header>
</template>
