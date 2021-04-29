<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md">
            <q-tabs
                v-model="tab"
                class="text-teal"
                align="left"
                dense
            >
                <q-tab name="account" icon="person" label="Account" />
                <q-tab name="trx" icon="money" label="Transaction" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="account">
                    <Account />
                </q-tab-panel>

                <q-tab-panel name="trx">
                    <Transaction />
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import Account from '../components/finance/Account';
import Transaction from '../components/finance/Transaction';

export default {
    name: 'Finance',
    components: { Account, Transaction },
    data() {
        return {
            tab: 'mails'
        }
    }
}
</script>