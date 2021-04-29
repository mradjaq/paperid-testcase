export default function () {
  return {
    title: 'Dialog',
    currentRow: {},
    columns: [
      {
        name: 'title',
        required: true,
        label: 'Title',
        align: 'center',
        field: 'title',
        sortable: true
      },
      { name: 'last_modified', required: true, label: 'Transaction Date', align: 'center', field: 'last_modified', sortable: true },
      { name: 'description', align: 'center', label: 'Reference', field: 'description' },
      { name: 'debit_amount', align: 'center', label: 'Debit Amount', field: 'debit_amount' },
      { name: 'credit_amount', align: 'center', label: 'Credit Amount', field: 'credit_amount' },
      { name: 'actions', align: 'center', label: 'Actions', field: 'actions' },
    ],
    data: [
    ],
    accountColumns: [
      {
        name: 'name',
        required: true,
        label: 'Account Name',
        align: 'center',
        field: 'name',
        sortable: true
      },
      { name: 'Description', align: 'center', label: 'Description', field: 'Description', sortable: true },
      { name: 'type', align: 'center', label: 'Account Type', field: 'type', sortable: true },
      { name: 'actions', align: 'center', label: 'Actions', field: 'actions' },
    ],
    accountData: [
    ],
    total: 0,
  }
}
