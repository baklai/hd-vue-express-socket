<script setup>
import BtnSocialMedia from '@/components/buttons/BtnSocialMedia.vue';
</script>

<template>
  <div class="col-12 my-auto">
    <div class="flex flex-column md:flex-row justify-content-center">
      <div class="w-full md:w-3 flex flex-column align-items-center justify-content-center">
        <header class="flex">
          <div class="w-30rem h-auto">
            <div class="mb-6">
              <div class="flex align-items-stretch mb-6">
                <div class="flex align-items-center justify-content-center">
                  <img src="/img/logo-app.webp" alt="HD logo" width="72" height="72" class="mr-4" />
                </div>
                <div>
                  <h1 class="uppercase font-bold text-7xl m-0">{{ $t('Helpdesk') }}</h1>
                  <p class="text-xl line-height-2">
                    {{ $t('Web Application of technical support') }}
                  </p>
                </div>
              </div>
              <p class="text-justify text-xl line-height-2 text-color-secondary">
                {{
                  $t(
                    'Helpdesk technical support is a type of customer service that provides assistance to customers who are having technical issues with their products or services'
                  )
                }}
              </p>
            </div>
            <nav class="flex justify-content-evenly mb-2">
              <BtnSocialMedia icon="pi pi-facebook" :tooltip="$t('Facebook')" />
              <BtnSocialMedia icon="pi pi-github" :tooltip="$t('Github')" />
              <BtnSocialMedia icon="pi pi-linkedin" :tooltip="$t('Linkedin')" />
            </nav>
            <p class="text-center text-500">
              {{ $t('Copyright © 2023 Dmitrii Baklai. All rights reserved.') }}
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
          <h3>
            {{ $t('Service') }}
          </h3>
          {{
            $t(
              'Helpdesk technical support is a type of customer service that provides assistance to customers who are having technical issues with their products or services.'
            )
          }}

          <h3>
            {{ $t('Community') }}
          </h3>
          Got stuck? Ask your question on
          <a href="https://chat.vuejs.org" target="_blank" rel="noopener"> Vue Land </a>
          , our official Discord server, or
          <a
            href="https://stackoverflow.com/questions/tagged/vue.js"
            target="_blank"
            rel="noopener"
          >
            StackOverflow
          </a>
          . You should also subscribe to
          <a href="https://news.vuejs.org" target="_blank" rel="noopener"> our mailing list </a>
          and follow the official
          <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"> @vuejs </a>
          twitter account for latest news in the Vue world.

          <h3>
            {{ $t('Support Vue') }}
          </h3>

          As an independent project, Vue relies on community backing for its sustainability. You can
          help us by
          <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a
          >.

          <h3>
            {{ $t('Documentation') }}
          </h3>

          HD’s
          <a href="https://vuejs.org/" target="_blank" rel="noopener"> official documentation </a>
          provides you with all information you need to get started.
        </main>
      </div>
    </div>
  </div>
</template>
