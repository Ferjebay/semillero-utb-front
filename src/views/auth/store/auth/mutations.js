export const loginUser = ( state, { user, idToken, refreshToken }) => {    
    if (idToken) {
        localStorage.setItem('idToken', idToken)
        state.idToken = idToken
    }

    if (refreshToken) {
        localStorage.setItem('refresh', refreshToken)
        state.refreshToken = refreshToken
    }

    state.user = user;
    state.hogar = user.name.split('|')[2].trim();
    localStorage.setItem('hogar', state.hogar)
    state.status = 'authenticated'
}

export const logout = (state) => {
    state.user          = null
    state.idToken       = null
    state.refreshToken  = null
    state.status        = 'not-authenticated'
    state.hogar         = null
    state.iot           = null

    localStorage.removeItem('idToken')
    localStorage.removeItem('refresh')
    localStorage.removeItem('hogar')
}

export const updateIotData = (state, datos) => {
    state.iot = datos;
}
