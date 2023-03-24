<script setup></script>

<template>
  <Button
    text
    plain
    rounded
    :icon="$auth.check() ? 'pi pi-sign-out' : 'pi pi-sign-in'"
    v-tooltip.bottom="$auth.check() ? $t('Log Out') : $t('Log In')"
    @click="$auth.check() ? $auth.logout() : $router.push('/auth/signin')"
  />
</template>
