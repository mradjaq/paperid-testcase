export const setUser = (state, payload) => (state.username = payload);
export const setSession = (state, payload) => {
    state.name = payload.name
    state.token = payload.token
    state.lastLogin = payload.last_login
}

export const clearSession = (state) => (state = {})