<template>
  <div class="q-py-md">
    <h5>All Finance Transactions</h5>
    <q-table
      title="All Finance Transactions"
      flat
      :data="data"
      :filter="filter"
      :columns="columns"
      row-key="name"
      name="financeTransactions"
    >   
        <!-- create new trx -->
        <template v-slot:top-left>
            <q-btn text-color="white" style="background-color: #00adb5" 
            label="Create New Transactions" 
            @click="createNewFinance"
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
                        <q-item clickable v-close-popup @click="editFinance(actionsCell.row)">
                            <q-item-section>
                                <q-avatar icon="edit" size="35px" style="background-color: #00adb5" text-color="white" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Edit</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="deleteFinance(actionsCell.row)">
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
        }
    },
    computed: {
        data() { return this.$store.state.finance.data },
        columns() { return this.$store.state.finance.columns }
    },
    methods: {
        createNewFinance() {
            this.$store.dispatch('finance/createDialog', {
                title: 'Create New Finance', type: 'new', parent: this
            })
        },
        editFinance(val) {
            this.$store.commit('finance/setCurrentRow', val);
            this.$store.dispatch('finance/createDialog', {
                title: 'Edit Finance', type: 'edit', parent: this
            })
        },
        deleteFinance(val) {
            this.$store.commit('finance/setCurrentRow', val);
            this.$store.dispatch('finance/deleteFinance', {
                data: val, parent: this
            })
        },
    },
    mounted() {
        this.$store.dispatch('finance/getTransactionList')
    }
}
</script>