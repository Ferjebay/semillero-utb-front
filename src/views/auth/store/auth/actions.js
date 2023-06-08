import authApi from '@/api/authApi'


export const createUser = async ({ commit }, user) => {    
    const { name, email, password } = user;

    try {
        const { data: { idToken, refreshToken } } = await authApi.post(':signUp', { email, password, returnSecureToken: true }) 
        
        const resp = await authApi.post(':update', { 
            displayName: name,
            idToken
        })

        console.log(resp);

        delete user.password
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
    } catch (error) {        
        return { ok: false, msg: error.response.data.error.message }
    }
}

export const signInUser = async ({ commit }, user) => {    
    const { email, password } = user;

    try {
        const { data: { idToken, refreshToken, displayName } } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        user.name = displayName
        
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
    } catch (error) {        
        return { ok: false, msg: error.response.data.error.message }
    }
}

export const checkAuthentication = async ({ commit }) => {    
   
    const idToken       = localStorage.getItem('idToken')
    const refreshToken  = localStorage.getItem('refresh')
    
    if (!idToken) {
        commit('logout')
        return { ok: false, msg: 'No hay token en la peticion' }
    }

    try {
        const { data } = await authApi.post(':lookup', { idToken })        
        const { displayName:name , email } = data.users[0];

        const user = {
            name,
            email
        }

        commit('loginUser', { user, idToken, refreshToken })
        return { ok: true }
    } catch (error) {        
        commit('logout')        
        return { ok:false, msg: error }
    }
}

