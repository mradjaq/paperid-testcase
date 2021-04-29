
import FinanceService from 'src/services/finance';
import state from '../account/state';

export const getTransactionList = async ({rootState, commit, state}) => {
    try {
        const perPage = 300
        const page = 0

        const res = await FinanceService.API.getTrxList({
            params: `finances?sort_field=title&sort_type=1&page=${page}&per_page=${perPage}`,
            token: rootState.account.token
        })
        commit('setTotalData', res.count);
        commit('setTrxData', res.data);
        return res.count
    } catch (e) {
        console.error('Error Getting Transaction List: ',e);
    }
}

export const createDialog = async ({rootState, commit, state, dispatch}, {title, type, parent}) => {
    try {
        commit('setTitle', title);
        const $q = await import('quasar');
        const { default: newFinanceComponent } = await import('src/components/dialog/NewFinance');
        const finance = await new Promise((resolve) => {
            $q.Dialog.create({
                component: newFinanceComponent,
                persistent: true,
                parent: parent
            }).onOk( async () => { 
                
                if (type == 'edit') {
                    const res = await FinanceService.API.editTrx({
                        params: `finances/${state.currentRow.id}`,
                        token: rootState.account.token,
                        data: {
                            title : state.currentRow.title,
                            debit_amount : parseInt(state.currentRow.debit_amount),
                            credit_amount : parseInt(state.currentRow.credit_amount),
                            description : state.currentRow.description,
                            finance_account_id : parseInt(state.currentRow.finance_account_id),
                        }
                    })
                    if(res == 204) {
                        dispatch('getTransactionList')
                    }
                } else {
                    const res = await FinanceService.API.createTrx({
                        params: `finances`,
                        token: rootState.account.token,
                        data: {
                            title : state.currentRow.title,
                            debit_amount : parseInt(state.currentRow.debit_amount),
                            credit_amount : parseInt(state.currentRow.credit_amount),
                            description : state.currentRow.description,
                            finance_account_id : parseInt(state.currentRow.finance_account_id),
                        }
                    })
                    if(res == 204) {
                        dispatch('getTransactionList')
                    }
                }
                resolve(true); 
            }).onCancel(()=> {resolve(false)})
        })
        commit('clearCurrentRow')
        if (!finance) {
            return;
        }
    } catch (e) {
        console.error('Error: ', e);
    }
}


export const deleteFinance = async ({ rootState, state, dispatch }, { data, parent }) => {
    try {
        const $q = await import('quasar');
        const { default: newFinanceComponent } = await import('src/components/dialog/DeleteFinance');
        const finance = await new Promise((resolve) => {
            $q.Dialog.create({
                component: newFinanceComponent,
                persistent: true,
                parent: parent
            }).onOk( async () => { 
                const res = await FinanceService.API.deleteTrx({
                    params: `finances/${state.currentRow.id}`,
                    token: rootState.account.token,
                })
                if(res == 204) {
                    dispatch('getTransactionList')
                }
                resolve(true); 
            }).onCancel(()=> {resolve(false)})
        })
    } catch (error) {
        
    }
}

// Account Part
export const getAccountList = async ({rootState, commit, state}) => {
    try {
        const perPage = 300
        const page = 0

        const res = await FinanceService.API.getAccountList({
            params: `finance-accounts?sort_field=name&sort_type=1&page=${page}&per_page=${perPage}`,
            token: rootState.account.token
        })

        commit('setTotalData', res.data.length);
        commit('setAccountData', res.data);
        return res.data.length
    } catch (e) {
        console.error('Error Getting Account List: ',e);
    }
}

export const createAccountDialog = async ({commit, rootState, state, dispatch}, {title, type, parent}) => {
    try {
        commit('setTitle', title);
        const $q = await import('quasar');
        const { default: accountDialog } = await import('src/components/dialog/AccountDialog');
        const account = await new Promise((resolve) => {
            $q.Dialog.create({
                component: accountDialog,
                persistent: true,
                parent: parent
            }).onOk(async () => {
                if (type == 'edit') {
                    const res = await FinanceService.API.editAccount({
                        params: `finance-accounts/${state.currentRow.id}`,
                        token: rootState.account.token,
                        data: {
                            name: state.currentRow.name,
                            type: state.currentRow.type,
                            Description: state.currentRow.Description,
                        }
                    })
                    if(res == 204) {
                        dispatch('getAccountList')
                    }
                } else {
                    const res = await FinanceService.API.createAccount({
                        params: `finance-accounts`,
                        token: rootState.account.token,
                        data: {
                            id: state.currentRow.id,
                            name: state.currentRow.name,
                            type: state.currentRow.type,
                            Description: state.currentRow.Description,
                        }
                    })
                    if(res == 204) {
                        dispatch('getAccountList')
                    }
                }
                resolve(true); 
            }).onCancel(()=> {resolve(false)})
        })
        commit('clearCurrentRow')
        if (!account) {
            return;
        }
    } catch (e) {
        console.error('error on: ', e);
    }
}

export const deleteAccount = async ({rootState, state, dispatch},{ parent }) => {
    try {
        const $q = await import('quasar');
        const { default: newFinanceComponent } = await import('src/components/dialog/DeleteAccount');
        const finance = await new Promise((resolve) => {
            $q.Dialog.create({
                component: newFinanceComponent,
                persistent: true,
                parent: parent
            }).onOk(async () => { 
                const res = await FinanceService.API.deleteAccount({
                    params: `finance-accounts/${state.currentRow.id}`,
                    token: rootState.account.token,
                })
                if(res == 204) {
                    dispatch('getAccountList')
                }
                resolve(true); 
            }).onCancel(()=> {resolve(false)})
        })
    } catch (e) {
        console.error('error on: ', e);
    }
}