<template>
  <div class="q-py-md">
    <h5>All Finance Account</h5>
    <q-table
      title="All Finance Account"
      flat
      :data="data"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30, 50]"
      :columns="columns"
      row-key="id"
      name="financeAccount"
    >
        <!-- create new trx -->
        <template v-slot:top-left>
            <q-btn text-color="white" 
                style="background-color: #00adb5" 
                label="Create New Account"
                @click="createNewAccount"
            flat/>
        </template>

        <!-- search field -->
        <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        </template>

        <!-- col actions -->
        <template v-slot:body-cell-actions="actionsCell">
            <q-td :props="actionsCell">
                <q-btn-dropdown style="background-color: #00adb5" label="Actions" text-color="white">
                    <q-list>

                        <q-item clickable v-close-popup @click="editAccount(actionsCell.row)">
                            <q-item-section>
                                <q-avatar icon="edit" size="35px" style="background-color: #00adb5" text-color="white" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Edit</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="deleteAccount(actionsCell.row)">
                            <q-item-section>
                                <q-avatar icon="delete" size="35px" style="background-color: #00adb5" text-color="white" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Delete</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-td>
        </template>
    </q-table>
  </div>
</template>
<script>
export default {
    name: 'Transaction',
    data() {
        return {
            filter: '',
            // pagination: {
            //     sortBy: 'desc',
            //     descending: false,
            //     page: 1,
            //     rowsPerPage: 10,
            //     rowsNumber: 10
            // }
        }
    },
    computed: {
        data() { return this.$store.state.finance.accountData },
        columns() { return this.$store.state.finance.accountColumns },
    },
    methods: {
        viewAccount(val){
            this.$store.commit('finance/setCurrentRow', val);
            this.$store.dispatch('finance/viewAccount', {parent: this})
        },
        createNewAccount() {
            this.$store.dispatch('finance/createAccountDialog', {
                title: 'Create New Account', type: 'new', parent: this
            })
        },
        editAccount(val) {
            this.$store.commit('finance/setCurrentRow', val);
            this.$store.dispatch('finance/createAccountDialog', {
                title: 'Edit Account', type: 'edit',parent: this
            })
        },
        deleteAccount(val) {
            this.$store.commit('finance/setCurrentRow', val);
            this.$store.dispatch('finance/deleteAccount', {
                data: val, parent: this
            })
        },
    },
    mounted() {
        this.$store.dispatch('finance/getAccountList')
    }
}
</script>