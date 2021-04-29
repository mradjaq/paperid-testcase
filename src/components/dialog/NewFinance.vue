<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md" style="width: 500px; max-width: 80vw;">
      <!--
        ...content
        ... use q-card-section for it?
      -->
        <q-card-actions class="q-pa-md">
            <div class="text-h5">{{data. title }}</div>
        </q-card-actions>
        <q-card-section >
          <div class="q-pa-md">
            <!-- <q-input outlined v-model="text" label="Outlined" /> -->
            <q-input v-model="data.title" label="Title" :dense="dense" />
            <q-input type="number" v-model="data.credit_amount" label="Credit Amount" :dense="dense" />
            <q-input type="number" v-model="data.debit_amount" label="Debit Amount" :dense="dense" />
            <q-input type="number" v-model="data.finance_account_id" label="Finance Account ID" :dense="dense" />
            <q-input v-model="data.description" label="Description" :dense="dense" />

          </div>
        </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="center">
        <q-btn color="teal" label="Simpan" @click="onOKClick" />
        <q-btn color="white" label="Batal" @click="onCancelClick" text-color="teal"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    //  props
  },
  data() {
    return{ 
      dense: false,
      title: ''
    }
  },
  computed: {
    data: {
      get() {
        return this.$store.state.finance.currentRow
      },
      set(val) {
        this.$store.commit('finance/setCurrentRow', {
          id: val.id,
          title: val.title,
          debit_amount: val.debit_amount,
          credit_amount: val.credit_amount,
          description: val.description,
          last_modified: val.last_modified,
          finance_account_id: val.finance_account_id
        })
      }
    }
  },
  mounted() {
    this.title = this.$store.state.finance.title
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
  }
}
</script>