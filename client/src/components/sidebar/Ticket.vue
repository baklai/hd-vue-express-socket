<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useTicket } from '@/stores/api/ticket';
import { useIPAddress } from '@/stores/api/ipaddress';
import { dateTimeToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();
const Ticket = useTicket();
const IPAddress = useIPAddress();

const emits = defineEmits(['toggleMenu', 'close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      Ticket.findOne({ id });

      // Ticket.record.ipaddress ? await IPAddress.findOne({ ipaddress: Ticket.record.ipaddress, populate: true }) : null;

      visible.value = true;
    } catch (err) {
      visible.value = false;
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

const visible = ref(false);

const toggleMenu = (event, data) => {
  emits('toggleMenu', event, data);
};

const onClose = () => {
  visible.value = false;
  Ticket.$reset();
  IPAddress.$reset();
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
          <AppIcons name="operational-journal" :size="40" class="mr-2" />
          <div>
            <p class="text-lg mb-0">{{ $t('Current request') }}</p>
            <p class="text-base font-normal">
              {{ $t('Status request') }} :
              {{ Ticket?.record?.closed ? $t('Request closed') : $t('Request opened') }}
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
            @click="toggleMenu($event, Ticket.record)"
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
        <h5>{{ $t('Current request') }}</h5>
        <table>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Opened an request') }} :</td>
            <td>{{ Ticket?.record?.workerOpen ? Ticket?.record?.workerOpen?.name : '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date opened') }} :</td>
            <td>
              {{ Ticket?.record?.created ? dateTimeToStr(Ticket?.record?.created) : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Status') }} :</td>
            <td>
              <i :class="Ticket?.record?.closed ? 'pi pi-check-circle text-green-500' : 'pi pi-circle text-red-500'" />
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Request') }} :</td>
            <td>
              {{ Ticket?.record?.request ? Ticket?.record?.request : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
            <td>
              {{ Ticket?.record?.location ? Ticket?.record?.location?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
            <td>{{ Ticket?.record?.fullname }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
            <td>{{ Ticket?.record?.phone }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
            <td>
              {{ Ticket?.record?.position ? Ticket?.record?.position?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
            <td>
              {{ Ticket?.record?.ipaddress ? Ticket?.record?.ipaddress : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Mail number') }} :</td>
            <td>{{ Ticket?.record?.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
            <td>
              {{ Ticket?.record?.company ? Ticket?.record?.company?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
            <td>
              {{ Ticket?.record?.branch ? Ticket?.record?.branch?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
            <td>
              {{ Ticket?.record?.enterprise ? Ticket?.record?.enterprise?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
            <td>
              {{ Ticket?.record?.department ? Ticket?.record?.department?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date closed') }} :</td>
            <td>
              {{ Ticket?.record?.closed ? dateTimeToStr(Ticket?.record?.closed) : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Closed an request') }} :</td>
            <td>
              {{ Ticket?.record?.workerClose ? Ticket?.record?.workerClose?.name : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Conclusion for request') }} :</td>
            <td>{{ Ticket?.record?.conclusion }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
            <td>{{ Ticket?.record?.comment }}</td>
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
