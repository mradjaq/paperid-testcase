<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md" style="width: 500px; max-width: 80vw;">

        <q-card-actions class="q-pa-md">
            <div class="text-h5">{{ title }}</div>
        </q-card-actions>

        <q-card-section >
          <div class="q-pa-md">
            <!-- <q-input outlined v-model="text" label="Outlined" /> -->
            <q-input v-model="data.name" label="Account Name" :dense="dense" />
            <q-input v-model="data.type" label="Type" :dense="dense" />
            <q-input v-model="data.Description" label="Description" :dense="dense" />
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
          name: val.name,
          type: val.type,
          Description: val.Description,
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
    }
  }
}
</script>