<script setup>
import BtnSocialMedia from '@/components/buttons/BtnSocialMedia.vue';
</script>

<template>
  <div class="col-12 my-auto">
    <div class="flex flex-column md:flex-row justify-content-center">
      <div class="w-full md:w-3 flex flex-column align-items-center justify-content-center">
        <header class="flex align-items-center justify-content-center">
          <div class="w-30rem h-auto text-center">
            <div class="flex justify-content-center mb-2">
              <div class="justify-content-start">
                <h1 class="uppercase font-bold text-7xl m-0 text-color">{{ $t('help') }}</h1>
              </div>
              <div class="flex align-items-center justify-content-center">
                <img src="/img/logo-app.webp" alt="HD logo" width="56" height="56" class="mx-2" />
              </div>
              <div class="justify-content-start">
                <h1 class="uppercase font-bold text-7xl m-0 text-color">{{ $t('desk') }}</h1>
              </div>
            </div>
            <div class="text-center mb-6">
              <p class="text-600 font-medium">{{ $t('Web Application of technical support') }}</p>
            </div>
            <div class="text-center mb-6">
              <p class="text-xl line-height-2 text-color-secondary">
                {{
                  $t(
                    'Helpdesk technical support is a type of customer service that provides assistance to customers who are having technical issues with their products or services'
                  )
                }}
              </p>
            </div>
            <nav class="flex justify-content-evenly mb-2">
              <BtnSocialMedia
                icon="pi pi-facebook"
                :href="$author?.social?.facebook"
                :tooltip="$t('Facebook')"
              />
              <BtnSocialMedia icon="pi pi-github" :href="$author?.social?.github" :tooltip="$t('Github')" />
              <BtnSocialMedia
                icon="pi pi-linkedin"
                :href="$author?.social?.linkedin"
                :tooltip="$t('Linkedin')"
              />
            </nav>
            <p class="text-center text-500">
              {{ $author.copyright }}
            </p>
          </div>
        </header>
      </div>

      <div class="w-full md:w-1">
        <Divider layout="vertical" class="hidden md:flex" />
        <Divider layout="horizontal" class="flex md:hidden" align="center" />
      </div>

      <div class="w-full md:w-3 flex align-items-center justify-content-center py-5">
        <main class="w-30rem justify-content-center align-items-center">
          <section id="documentation" class="mb-4">
            <h3>
              {{ $t('Documentation') }}
            </h3>

            HD’s
            <RouterLink to="/docs">official documentation</RouterLink>
            provides you with all information you need to get started.
          </section>

          <section id="pc-sys-inspector" class="mb-4">
            <h3>
              {{ $t('PC SysInspector') }}
            </h3>
            <RouterLink to="/app/pc-sys-inspector/statistics">PC SysInspector service</RouterLink> aggregates
            information about computers on the network, which can be useful for managing a fleet of computers
            and ensuring the security of an organization.
          </section>

          <section id="operational-journal" class="mb-4">
            <h3>
              {{ $t('Help Desk Live Log') }}
            </h3>
            <RouterLink to="/app/helpdesk-live-log/statistics">Help Desk Live Log</RouterLink> web service
            allows users to submit support tickets through a web interface, track ticket status, and provide
            statistics and analytics on Help Desk performance.
          </section>

          <section id="network-information" class="mb-4">
            <h3>
              {{ $t('Network information') }}
            </h3>
            <RouterLink to="/app/network-info/statistics">Network information</RouterLink> web service is
            designed for keeping track of IP addresses of network devices and users on a local network. It
            allows administrators to keep records, as well as provides information on the availability of
            devices and their current status.
          </section>
        </main>
      </div>
    </div>
  </div>
</template>
