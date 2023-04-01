<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useRequest } from '@/stores/restfullapi';
import { dateTimeToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();
const request = useRequest();

const visible = ref(false);
const report = ref({});

const $emit = defineEmits(['toggleMenu']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      report.value = await request.findOne({ id });

      //  ipaddress.value = this.report.ipaddress
      //           ? await this.getIPAddress(this.report.ipaddress)
      //           : null;

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
      <div class="flex justify-content-between">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="operational-journal" :size="40" class="mr-2" />
          <div>
            <p class="text-lg mb-0">{{ $t('Current request') }}</p>
            <p class="text-base font-normal">
              {{ $t('Status request') }} :
              {{ report?.closed ? $t('Request closed') : $t('Request opened') }}
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
        <h5>{{ $t('Current request') }}</h5>
        <table>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Opened an request') }} :</td>
            <td>{{ report?.workerOpen ? report?.workerOpen?.name : '-' }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date opened') }} :</td>
            <td>
              {{ report?.created ? dateTimeToStr(report?.created) : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Status') }} :</td>
            <td>
              <i
                :class="
                  report?.closed ? 'pi pi-check-circle text-green-500' : 'pi pi-circle text-red-500'
                "
              />
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Request') }} :</td>
            <td>
              {{ report?.request ? report?.request : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
            <td>
              {{ report?.location ? report?.location?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
            <td>{{ report?.fullname }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
            <td>{{ report?.phone }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
            <td>
              {{ report?.position ? report?.position?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
            <td>
              {{ report?.ipaddress ? report?.ipaddress : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Mail number') }} :</td>
            <td>{{ report?.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
            <td>
              {{ report?.company ? report?.company?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
            <td>
              {{ report?.branch ? report?.branch?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
            <td>
              {{ report?.enterprise ? report?.enterprise?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
            <td>
              {{ report?.department ? report?.department?.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date closed') }} :</td>
            <td>
              {{ report?.closed ? dateTimeToStr(report?.closed) : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Closed an request') }} :</td>
            <td>
              {{ report?.workerClose ? report?.workerClose?.name : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Conclusion for request') }} :</td>
            <td>{{ report?.conclusion }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
            <td>{{ report?.comment }}</td>
          </tr>
        </table>

        <!-- 
        <h5>{{ $t('IP Address') }}</h5>
        <table>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
            <td>
              {{ ipaddress.location ? ipaddress.location.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Unit') }} :</td>
            <td>
              {{ ipaddress.unit ? ipaddress.unit.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
            <td>{{ ipaddress.ipaddress }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Mask') }} :</td>
            <td>{{ ipaddress.mask }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Gateway') }} :</td>
            <td>{{ ipaddress.gateway }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('№ Mail') }} :</td>
            <td>{{ ipaddress.mail }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
            <td>
              {{ ipaddress.company ? ipaddress.company.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
            <td>
              {{ ipaddress.branch ? ipaddress.branch.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
            <td>
              {{ ipaddress.enterprise ? ipaddress.enterprise.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
            <td>
              {{ ipaddress.department ? ipaddress.department.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
            <td>{{ ipaddress.fullname }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
            <td>
              {{ ipaddress.position ? ipaddress.position.title : '-' }}
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
            <td>{{ ipaddress.phone }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Autoanswer') }} :</td>
            <td>{{ ipaddress.autoanswer }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Date open') }} :</td>
            <td>{{ ipaddress.date | dateToStr }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
            <td>{{ ipaddress.comment }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('Internet') }} :</td>
            <td>
                 <i
                :class="
                  ipaddress.status.internet
                    ? 'mdi-check-bold green'
                    : 'mdi-minus default'
                "
              />
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold" width="50%">{{ $t('E-mail') }} :</td>
            <td>
                  <i
                :class="
                  ipaddress.status.email
                    ? 'mdi-check-bold green'
                    : 'mdi-minus default'
                "
              />
            </td>
          </tr>
        </table> -->
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
