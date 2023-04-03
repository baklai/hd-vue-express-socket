<template>
  <v-dialog scrollable width="900" v-if="report" v-model="dialog" overlay-color="#525252">
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      report: null
    };
  },

  filters: {
    dateTimeToStr: function (value) {
      return value ? new Date(value).toLocaleString() : '-';
    },

    dateToStr: function (value) {
      return value ? new Date(value).toLocaleDateString() : '-';
    },

    strToDate: function (value) {
      return [value.slice(0, 4), '/', value.slice(4, 6), '/', value.slice(6)].join('');
    },

    bitTo: function (value) {
      const index = Math.floor(Math.log(value) / Math.log(1024));
      return (
        (value / Math.pow(1024, index)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GiB', 'TB'][index]
      );
    },

    memorySum: function (value) {
      const summa = value.reduce(
        (accumulator, { Capacity }) => Number(accumulator) + Number(Capacity),
        0
      );
      const index = Math.floor(Math.log(summa) / Math.log(1024));
      return (
        (summa / Math.pow(1024, index)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GiB', 'TB'][index]
      );
    },

    diskSum: function (value) {
      const summa = value.reduce((accumulator, { Size }) => Number(accumulator) + Number(Size), 0);
      const index = Math.floor(Math.log(summa) / Math.log(1024));
      return (
        (summa / Math.pow(1024, index)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GiB', 'TB'][index]
      );
    }
  },

  methods: {
    async onItem(id) {
      try {
        this.report = null;
        this.report = await this.$store.dispatch('api/inspector/findOne', id);
        const ipaddress = await this.$store.dispatch('api/ipaddress/searchOne', this.report.host);
        this.report.ipaddress = ipaddress;
        if (this.report.os) {
          this.$toast.success(this.$t('Report received successfully'));
          this.dialog = true;
        } else {
          this.$toast.error(this.$t('Record not found'));
          this.dialog = false;
        }
      } catch (err) {
        this.$toast.error(this.$t('Record not found'));
        this.close();
      }
    },

    async saveReport() {
      try {
        if (process.browser) {
          const html2pdf = require('html2pdf.js');
          const element = document.getElementById('report');
          await html2pdf(element, {
            margin: 1,
            filename: `SYSINSPECTOR_${this.report.host} (${new Date(
              this.report.updated
            ).toLocaleDateString()}).pdf`,
            jsPDF: {
              orientation: 'portrait',
              format: 'a4',
              floatPrecision: 16
            }
          });
          this.$toast.success(this.$t('Report created successfully'));
        }
      } catch (err) {
        this.$toast.error(this.$t('An unexpected error has occurred'));
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border: 15px solid transparent;
  border-top: 5px solid transparent;
  border-collapse: collapse;
}

th {
  font-size: 14px;
  font-weight: bold;
  padding: 5px;
  border: none;
  text-align: left;
  background: transparent;
  text-transform: uppercase;
}

td {
  font-size: 12px;
  padding: 3px;
  border: none;
}

.theme--light td,
th {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.theme--dark td,
th {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
