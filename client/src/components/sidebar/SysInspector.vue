<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useInspector, useIPAddress } from '@/stores/restfullapi';
import { dateToStr, dateTimeToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();
const inspector = useInspector();
const ipaddress = useIPAddress();

const visible = ref(false);
const iptable = ref({});
const record = ref({});

const $emit = defineEmits(['toggleMenu']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      record.value = await inspector.findOne({ id });
      iptable.value = await ipaddress.searchOne({ ipaddress: record.value.host });
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
    v-if="visible"
    class="h-full sticky shadow-none w-full overflow-y-auto border-left-1 border-noround surface-border px-2 w-4"
  >
    <template #title>
      <div class="flex justify-content-between mb-4">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="pc-sys-inspector" :size="40" class="my-auto mr-2" />
          <div>
            <p class="text-lg mb-0">{{ record.os ? record.os.CSName : record.host }}</p>
            <p class="text-base font-normal mb-0">{{ $t('Report host') }}: {{ record.host }}</p>
            <p class="text-base font-normal">
              {{ $t('Report date') }}: {{ dateTimeToStr(record.updated) }}
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
      <div class="overflow-y-auto" style="height: calc(100vh - 25rem)">
        <div class="flex align-items-center">
          <i class="pi pi-desktop my-auto mr-3" style="font-size: 2.5rem" />
          <div>
            <p class="text-base font-normal mb-0">{{ record.os ? record.os.CSName : '-' }}</p>
            <p class="text-base font-normal mb-0">IP {{ iptable.ipaddress }}</p>
          </div>
        </div>

        <table>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
            <td>{{ iptable?.location?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Unit') }} :</td>
            <td>{{ iptable?.unit?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
            <td>{{ iptable?.ipaddress }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Mask') }} :</td>
            <td>{{ iptable?.mask }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Gateway') }} :</td>
            <td>{{ iptable?.gateway }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('№ Mail') }} :</td>
            <td>{{ iptable?.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
            <td>{{ iptable?.company?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
            <td>{{ iptable?.branch?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
            <td>{{ iptable?.enterprise?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
            <td>{{ iptable?.department?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
            <td>{{ iptable?.fullname }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
            <td>{{ iptable?.position?.title || '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
            <td>{{ iptable?.phone }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Autoanswer') }} :</td>
            <td>{{ iptable?.autoanswer }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date open') }} :</td>
            <td>{{ dateToStr(iptable?.date) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
            <td>{{ iptable?.comment }}</td>
          </tr>

          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Internet') }} :</td>
            <td>
              <i
                :class="
                  iptable?.status?.internet ? 'pi pi-check font-bold text-green-500' : 'pi pi-ban'
                "
              />
            </td>
          </tr>

          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('E-mail') }} :</td>
            <td>
              <i
                :class="
                  iptable?.status?.email ? 'pi pi-check font-bold text-green-500' : 'pi pi-ban'
                "
              />
            </td>
          </tr>
        </table>

        <h5>{{ record.os ? record.os.OSArchitecture : '-' }}</h5>
        <h5>{{ record.os ? record.os.Version : '-' }}</h5>

        <table>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('№ Mail') }} :</td>
            <td>{{ record?.internet?.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Date open') }} :</td>
            <td>{{ dateToStr(record?.internet?.dateOpen) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Date close') }} :</td>
            <td>{{ dateToStr(record?.internet?.dateClose) }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="40%">{{ $t('Comment') }} :</td>
            <td>{{ record?.internet?.comment }}</td>
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
