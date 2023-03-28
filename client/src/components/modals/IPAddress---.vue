<script>
export default {
  methods: {
    async onItem(id) {
      this.editedIndex = -1;
      this.IDItem = id;
      try {
        this.status = this.IDItem ? this.$t('Edit current record') : this.$t('Create new record');

        this.locations = await this.$store.dispatch('api/location/findAll');
        this.units = await this.$store.dispatch('api/unit/findAll');
        this.companies = await this.$store.dispatch('api/company/findAll');
        this.branches = await this.$store.dispatch('api/branch/findAll');
        this.enterprises = await this.$store.dispatch('api/enterprise/findAll');
        this.departments = await this.$store.dispatch('api/department/findAll');
        this.positions = await this.$store.dispatch('api/position/findAll');

        if (this.IDItem) {
          const data = await this.$store.dispatch('api/ipaddress/findOne', this.IDItem);
          this.item.date = data.date;
          data.location ? (this.item.location = data.location.id) : (this.item.location = null);
          data.unit ? (this.item.unit = data.unit.id) : (this.item.unit = null);
          this.item.ipaddress = data.ipaddress;
          this.item.cidr = data.cidr;
          data.company ? (this.item.company = data.company.id) : (this.item.company = null);
          data.branch ? (this.item.branch = data.branch.id) : (this.item.branch = null);
          data.enterprise
            ? (this.item.enterprise = data.enterprise.id)
            : (this.item.enterprise = null);
          data.department
            ? (this.item.department = data.department.id)
            : (this.item.department = null);
          this.item.fullname = data.fullname;
          data.position ? (this.item.position = data.position.id) : (this.item.position = null);
          this.item.phone = data.phone;
          this.item.mail = data.mail;
          this.item.autoanswer = data.autoanswer;
          this.item.comment = data.comment;

          this.item.internet_mail = data.internet.mail;
          this.item.internet_dateOpen = data.internet.dateOpen;
          this.item.internet_dateClose = data.internet.dateClose;
          this.item.internet_comment = data.internet.comment;

          data.email ? (this.item.email = data.email) : (this.item.email = []);
        }
        this.dialog = true;
      } catch (err) {
        this.$toast.error(this.$t(err.message));
        this.close();
      }
    },

    async save() {
      if (this.$refs.form.validate()) {
        try {
          let resp = null;
          if (this.IDItem) {
            resp = await this.$store.dispatch('api/ipaddress/updateOne', {
              id: this.IDItem,

              date: this.item.date,
              location: this.item.location,
              unit: this.item.unit,
              ipaddress: this.item.ipaddress,
              cidr: this.item.cidr,
              company: this.item.company,
              branch: this.item.branch,
              enterprise: this.item.enterprise,
              department: this.item.department,
              fullname: this.item.fullname,
              position: this.item.position,
              phone: this.item.phone,
              mail: this.item.mail,
              autoanswer: this.item.autoanswer,
              comment: this.item.comment,
              internet: {
                mail: this.item.internet_mail,
                dateOpen: this.item.internet_dateOpen,
                dateClose: this.item.internet_dateClose,
                comment: this.item.internet_comment
              },
              email: this.item.email
            });
            if (resp) this.$toast.success(this.$t('Record is updated'));
          } else {
            resp = await this.$store.dispatch('api/ipaddress/createOne', {
              date: this.item.date,
              location: this.item.location,
              unit: this.item.unit,
              ipaddress: this.item.ipaddress,
              cidr: this.item.cidr,
              company: this.item.company,
              branch: this.item.branch,
              enterprise: this.item.enterprise,
              department: this.item.department,
              fullname: this.item.fullname,
              position: this.item.position,
              phone: this.item.phone,
              mail: this.item.mail,
              autoanswer: this.item.autoanswer,
              comment: this.item.comment,
              internet: {
                mail: this.item.internet_mail,
                dateOpen: this.item.internet_dateOpen,
                dateClose: this.item.internet_dateClose,
                comment: this.item.internet_comment
              },
              email: this.item.email
            });
            if (resp) this.$toast.success(this.$t('Record is created'));
          }
          this.close();
        } catch (err) {
          console.error(err);
          this.$toast.error(err.message);
        }
      } else {
        this.$toast.error(this.$t('Fill in all required fields'));
      }
    },

    close() {
      this.editedIndex = -1;
      this.IDItem = null;
      this.dialog = false;
      this.$emit('closeEvent');
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },

    editItem(item) {
      this.editedIndex = this.item.email.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    deleteItem(item) {
      const index = this.item.email.indexOf(item);
      confirm(this.$t('Are you sure you want to delete this item')) &&
        this.item.email.splice(index, 1);
    },
    closeItem() {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 500);
    },
    addItem() {
      const addObj = Object.assign({}, this.defaultItem);
      this.editedIndex = this.item.email.length + 1;
      this.item.email.unshift(addObj);
      this.editItem(addObj);
    },
    saveItem() {
      if (this.editedIndex > -1) {
        Object.assign(this.item.email[this.editedIndex], this.editedItem);
      }
      this.closeItem();
    }
  }
};
</script>
