
const baseUrl= 'https://development.paper.id:3500/test-case/api/v1/'
export default {
    baseUrl,
    ContentType: 'application/json;charset=UTF-8',
    API: {
        login: async ({data}) => {
            try {
                const response = await fetch(baseUrl+'login', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' :  'http://development.paper.id:3500/test-case'
                    },
                    body: JSON.stringify(data)
                });
                return response.json(); 
            } catch (e) {
                return e
            }
            
        },
        // Account API
        getAccountList: async ({params, token}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer '+ token
                    },
                });
                return response.json(); 
            } catch (e) {
                console.error('GetAccountList [Error]; ', e);
                return e
            }
        },
        createAccount: async ({params, token, data}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                return response.status;
            } catch (e) {
                return e
            }
           
        },
        editAccount: async ({params, token, data}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'PUT',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                return response.status;
            } catch (e) {
                return e
            }
        },
        deleteAccount: async ({params, token}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer ' + token
                    },
                });
                return response.status;
            } catch (e) {
                return e
            }
        },
        getTrxList: async ({params, token}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer '+ token
                    },
                });
                return response.json(); 
            } catch (e) {
                console.error('GetAccountList [Error]; ', e);
                return e
            }
        },
        createTrx: async ({params, token, data}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                
                return response.status;
            } catch (e) {
                return e
            }
        },
        editTrx: async ({params, token, data}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'PUT',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                
                return response.status;
            } catch (e) {
                return e
            }
        },
        deleteTrx: async ({params, token}) => {
            try {
                const response = await fetch(baseUrl+params, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Host' : 'http://development.paper.id:3500/test-case',
                        'Authorization': 'Bearer ' + token
                    },
                });
                return response.status;
            } catch (e) {
                return e
            }
        },
    }
}
