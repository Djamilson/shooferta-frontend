import { useToast } from '@chakra-ui/react'
import decode from 'jwt-decode'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'
import { IUser } from '../@model/user/user'
import { api } from '../_services/apiClient'
import { logado } from './logado'

interface SignInCredentials {
    email: string
    password: string
}

const medida = () => {
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
            navigator.userAgent
        )
    ) {
        return 'Mobile'
    } else {
        return 'Desktop'
    }
}

interface AuthContextData {
    user: IUser
    isAuthenticated: boolean
    signIn: (credentials: SignInCredentials) => Promise<void>
    signOut: () => void
    updateUser: (user: IUser) => void
}

type AuthProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
    destroyCookie(null, logado.nameToken)
    destroyCookie(null, logado.nameRefreshToken)

    authChannel?.postMessage('signOut')

    Router.push('/')
}

function AuthProvider({ children }: AuthProviderProps) {
    const toast = useToast()

    const [user, setUser] = useState<IUser>()
    const isAuthenticated = !!user

    const { 'nextauth.shooferta.frontend.token': token } = parseCookies()

    useEffect(() => {
        if (!token) {
            signOut()
            setUser(null)
        }
    }, [token])

    useEffect(() => {
        authChannel = new BroadcastChannel('auth')

        authChannel.onmessage = message => {
            switch (message.data) {
                case 'signOut': {
                    setUser(null)
                    signOut()
                    break
                }

                default:
                    break
            }
        }
    }, [])

    useEffect(() => {
        if (!token) {
            signOut()
            setUser(null)
        }

        if (token) {
            const dataToken = decode<{ sub: string }>(token)

            if (dataToken.sub) {
                const url = `users/me/${dataToken.sub}`

                api.get(url)
                    .then(res => {
                        setUser(res.data)
                    })
                    .catch(() => {
                        signOut()
                        setUser(null)
                    })
            } else {
                signOut()
                setUser(null)
            }
        }
    }, [])

    async function signIn({ email, password }) {
        try {
            const device = medida()
            const res = await api.post('sessions', { email, password, device })

            const { user, token, refreshToken } = res.data

            setCookie(undefined, logado.nameToken, token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
                sameSite: true,
                secure: true
            })

            setCookie(undefined, logado.nameRefreshToken, refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
                sameSite: true,
                secure: true
            })

            api.defaults.headers.common['authorization'] = `Bearer ${token}`
            setUser(user)

            Router.push('/home')
        } catch (error) {
            toast({
                title: 'Erro de login.',
                description: 'Não foi possível fazer login, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    function updateUser(userUpdate: IUser) {
        setUser({
            ...userUpdate
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                signOut,
                updateUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth mus be used within an AuthProvider')
    }

    return context
}

export { AuthProvider, useAuth }
