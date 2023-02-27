<script setup>
import { inject } from 'vue';

const useAuth = inject('auth');

const auth = useAuth();

console.log(auth.user.email);
</script>

<template>
  <div class="col-12">
    <div class="card h-full">
      main
      <p>{{ $auth().user.email }}</p>
    </div>
  </div>
</template>
