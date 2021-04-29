/*
export function someMutation (state) {
}
*/
export const setTitle = (state, payload) => (state.title = payload);
export const setCurrentRow = (state, payload) => (state.currentRow = payload);
export const setAccountData = (state, payload) => (state.accountData = payload)
export const setTrxData = (state, payload) => (state.data = payload)
export const setTotalData = (state, payload) => (state.total = payload);
export const clearCurrentRow = (state, payload) => (state.currentRow = {})