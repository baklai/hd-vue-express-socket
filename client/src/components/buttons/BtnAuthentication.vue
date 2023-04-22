<script setup></script>

<template>
  <Button
    text
    plain
    rounded
    :icon="$helpdesk.loggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in'"
    v-tooltip.bottom="$helpdesk.loggedIn ? $t('Log Out') : $t('Log In')"
    @click="$helpdesk.loggedIn ? $helpdesk.logout() : $router.push({ name: 'signin' })"
  />
</template>
