import FinanceService from '../../services/finance/index';
export const login = async({commit, state}, {data}) => {
    try {
        commit('setUser', data.username);
        const response = await FinanceService.API.login({data})
        commit('setSession', response);
        alert(response.message)
        return response; 
    } catch (e) {
        console.error('Error On Login: ', e);
    }
}
