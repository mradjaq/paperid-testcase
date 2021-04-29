<template>
    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card class="q-dialog-plugin q-pa-md" style="width: 500px; max-width: 80vw;">
            <q-card-section class="q-pa-md">
                <div class="text-h5">Delete {{ accName }}</div>
                <div class="text-h8">Are you sure?</div>
            </q-card-section>

            <!-- buttons example -->
            <q-card-actions align="center">
                <q-btn color="white" label="Delete" @click="onOKClick" text-color="teal"/>
                <q-btn color="teal" label="Batal" @click="onCancelClick" />
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
      accName: ''
    }
  },
  mounted() {
    this.accName = this.$store.state.finance.currentRow.name
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