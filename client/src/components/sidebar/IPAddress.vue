<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useIPAddress } from '@/stores/restfullapi';
import { dateToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();
const ipaddress = useIPAddress();

const visible = ref(false);
const report = ref({});

const $emit = defineEmits(['toggleMenu']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      report.value = await ipaddress.findOne({ id });
      visible.value = true;
    } catch (err) {
      visible.value = false;
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

const toggleMenu = (event, data) => {
  $emit('toggleMenu', event, data);
};

const onClose = () => {
  visible.value = false;
};
</script>

<template>
  <Card
    :class="!visible && 'hidden'"
    class="h-full sticky shadow-none w-full overflow-y-auto border-left-1 border-noround surface-border px-2 w-4"
  >
    <template #title>
      <div class="flex justify-content-between">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="ip-address" :size="40" class="mr-2" />
          <div>
            <p class="text-lg mb-0">IP {{ report?.ipaddress }}</p>
            <p class="text-base font-normal">
              {{ $t('Date open') }} : {{ dateToStr(report?.date) }}
            </p>
          </div>
        </div>
        <div class="flex align-items-center justify-content-center">
          <Button
            text
            plain
            rounded
            iconClass="text-xl"
            class="w-2rem h-2rem hover:text-color mx-2"
            icon="pi pi-ellipsis-v"
            v-tooltip.bottom="$t('Menu')"
            @click="toggleMenu($event, report)"
          />
          <Button
            text
            plain
            rounded
            iconClass="text-xl"
            class="w-2rem h-2rem hover:text-color mx-2"
            icon="pi pi-times"
            v-tooltip.bottom="$t('Close')"
            @click="onClose"
          />
        </div>
      </div>
    </template>

    <template #content>
      <div class="overflow-y-auto" style="height: calc(100vh - 25rem)">
        <h5>{{ $t('IP Address') }}</h5>
        <table>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
            <td>{{ report?.location?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Unit') }} :</td>
            <td>{{ report?.unit?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
            <td>{{ report?.ipaddress }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Mask') }} :</td>
            <td>{{ report?.mask }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Gateway') }} :</td>
            <td>{{ report?.gateway }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('№ Mail') }} :</td>
            <td>{{ report?.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
            <td>{{ report?.company?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
            <td>{{ report?.branch?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
            <td>{{ report?.enterprise?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
            <td>{{ report?.department?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
            <td>{{ report?.fullname }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
            <td>{{ report?.position?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
            <td>{{ report?.phone }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Autoanswer') }} :</td>
            <td>{{ report?.autoanswer }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date open') }} :</td>
            <td>{{ dateToStr(report?.date) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
            <td>{{ report?.comment }}</td>
          </tr>

          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Internet') }} :</td>
            <td>
              <i
                :class="
                  report?.status?.internet ? 'pi pi-check font-bold text-green-500' : 'pi pi-ban'
                "
              ></i>
            </td>
          </tr>

          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('E-mail') }} :</td>
            <td>
              <i
                :class="
                  report?.status?.email ? 'pi pi-check font-bold text-green-500' : 'pi pi-ban'
                "
              ></i>
            </td>
          </tr>
        </table>

        <h5>{{ $t('Internet') }}</h5>
        <table>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('№ Mail') }} :</td>
            <td>{{ report?.internet?.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Date open') }} :</td>
            <td>{{ dateToStr(report?.internet?.dateOpen) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Date close') }} :</td>
            <td>{{ dateToStr(report?.internet?.dateClose) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Comment') }} :</td>
            <td>{{ report?.internet?.comment }}</td>
          </tr>
        </table>

        <h5>{{ $t('E-mail') }}</h5>
        <table v-for="email in report?.email" :key="email?.login">
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Login') }} :</td>
            <td>{{ email?.login }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Fullname') }} :</td>
            <td>{{ email?.fullname }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('№ Mail') }} :</td>
            <td>{{ email?.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Date open') }} :</td>
            <td>{{ dateToStr(email?.dateOpen) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Date close') }} :</td>
            <td>{{ dateToStr(email?.dateClose) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Comment') }} :</td>
            <td>{{ email?.comment }}</td>
          </tr>
        </table>
      </div>
    </template>
  </Card>
</template>

<style scoped>
table {
  width: 100%;
  border: 15px solid transparent;
  border-top: 5px solid transparent;
  border-collapse: collapse;
}

td,
th {
  font-size: 14px;
  border-bottom: 1px solid var(--surface-border);
}

th {
  font-weight: bold;
  text-align: left;
  background: transparent;
  text-transform: uppercase;
  padding: 5px;
}

td {
  padding: 3px;
}
</style>
