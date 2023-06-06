<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useVPNAddress } from '@/stores/api/vpn';
import { dateToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();
const VPNAddress = useVPNAddress();

const emits = defineEmits(['toggleMenu', 'close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      record.value = await VPNAddress.findOne({ id, populate: true });
      visible.value = true;
    } catch (err) {
      visible.value = false;
      record.value = VPNAddress.$reset();
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

const visible = ref(false);

const record = ref({});

const toggleMenu = (event, data) => {
  emits('toggleMenu', event, data);
};

const onClose = () => {
  visible.value = false;
  record.value = VPNAddress.$reset();
  emits('close', {});
};
</script>

<template>
  <Card
    v-if="visible"
    class="h-full surface-overlay sticky shadow-none w-full overflow-y-auto border-left-1 border-noround surface-border px-2 w-4"
  >
    <template #title>
      <div class="flex justify-content-between">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="network-vpn-clients" :size="40" class="mr-2" />
          <div>
            <p class="text-lg mb-0">{{ $t('VPN IP Address') }} {{ record?.vpn }}</p>
            <p class="text-base font-normal">
              {{ $t('Date open') }} : {{ dateToStr(record?.dateOpen) || '-' }}
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
            @click="toggleMenu($event, record)"
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
      <div class="overflow-y-auto pt-4" style="height: calc(100vh - 25rem)">
        <h5>{{ $t('Network VPN Client') }}</h5>

        <table>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date open') }} :</td>
            <td>{{ dateToStr(record?.dateOpen) || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date close') }} :</td>
            <td>{{ dateToStr(record?.dateClose) || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Mail number') }} :</td>
            <td>{{ record?.mail || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('VPN IP Address') }} :</td>
            <td>{{ record?.vpn || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('VPN Login') }} :</td>
            <td>{{ record?.login || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('VPN Services') }} :</td>
            <td>{{ record?.service || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
            <td>{{ record?.location?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Unit') }} :</td>
            <td>{{ record?.unit?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
            <td>{{ record?.ipaddress || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
            <td>{{ record?.company?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
            <td>{{ record?.branch?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
            <td>{{ record?.enterprise?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
            <td>{{ record?.department?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
            <td>{{ record?.fullname || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
            <td>{{ record?.position?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
            <td>{{ record?.phone || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
            <td>{{ record?.comment }}</td>
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
