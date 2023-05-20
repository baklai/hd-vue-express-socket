<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useTicket } from '@/stores/api/ticket';
import { useIPAddress } from '@/stores/api/ipaddress';
import { dateTimeToStr } from '@/service/DataFilters';

import IPTable from '@/components/tables/IPTable.vue';

const { t } = useI18n();
const toast = useToast();
const Ticket = useTicket();
const IPAddress = useIPAddress();

const emits = defineEmits(['toggleMenu', 'close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      record.value = await Ticket.findOne({ id, populate: true });
      recordIP.value = record.value?.ipaddress
        ? await IPAddress.findOne({ ipaddress: record.value.ipaddress, populate: true })
        : null;

      console.log(recordIP.value);

      visible.value = true;
    } catch (err) {
      visible.value = false;
      record.value = Ticket.$reset();
      recordIP.value = IPAddress.$reset();
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

const visible = ref(false);

const record = ref({});
const recordIP = ref({});

const toggleMenu = (event, data) => {
  emits('toggleMenu', event, data);
};

const onClose = () => {
  visible.value = false;
  record.value = Ticket.$reset();
  recordIP.value = IPAddress.$reset();
  emits('close', {});
};
</script>

<template>
  <Card
    v-if="visible"
    class="h-full sticky shadow-none w-full overflow-y-auto border-left-1 border-noround surface-border px-2 w-4"
  >
    <template #title>
      <div class="flex justify-content-between">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="helpdesk-live-log" :size="40" class="mr-2" />
          <div>
            <p class="text-lg mb-0">{{ $t('Current ticket') }}</p>
            <p class="text-base font-normal">
              {{ $t('Status') }} :
              {{ record?.closed ? $t('Ticket closed') : $t('Ticket opened') }}
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
        <h5>{{ $t('Description') }}</h5>
        <table>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Opened an ticket') }} :</td>
            <td>{{ record?.workerOpen ? record?.workerOpen?.name : '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date opened') }} :</td>
            <td>
              {{ record?.created ? dateTimeToStr(record?.created) : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Status') }} :</td>
            <td>
              <i
                :class="
                  record?.closed ? 'pi pi-check-circle text-green-500' : 'pi pi-circle text-red-500'
                "
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p class="font-weight-bold w-full pb-2">{{ $t('Request') }} :</p>
              {{ record?.request ? record?.request : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
            <td>
              {{ record?.location ? record?.location?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
            <td>{{ record?.fullname || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
            <td>{{ record?.phone || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
            <td>
              {{ record?.position ? record?.position?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
            <td>
              {{ record?.ipaddress ? record?.ipaddress : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Mail number') }} :</td>
            <td>{{ record?.mail || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
            <td>
              {{ record?.company ? record?.company?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
            <td>
              {{ record?.branch ? record?.branch?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
            <td>
              {{ record?.enterprise ? record?.enterprise?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
            <td>
              {{ record?.department ? record?.department?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date closed') }} :</td>
            <td>
              {{ record?.closed ? dateTimeToStr(record?.closed) : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Closed an ticket') }} :</td>
            <td>
              {{ record?.workerClose ? record?.workerClose?.name : '-' }}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <p class="font-weight-bold w-full pb-2">{{ $t('Conclusion for ticket') }} :</p>
              {{ record?.conclusion || '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
            <td>{{ record?.comment || '-' }}</td>
          </tr>
        </table>

        <h5 v-if="recordIP">{{ $t('IP Address') }}</h5>
        <IPTable :record="recordIP" :internet="false" :email="false" v-if="recordIP" />
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
