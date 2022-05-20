import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/auth'
import { logado } from '../contexts/logado'
import host from '../_config/host'
import { AuthTokenError } from './errors/AuthTokenError'

const device = 'Device.modelName'

let isRefreshing = false
let failedRequestsQueue: any[] = []

type IProps = {
    ctx?: any
}

type TodoErrorResponse = {
    status: any
    message: {
        name: string
        message: string
        expiredAt: Date
    }
}

export const isServer = () => typeof window === 'undefined'

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx)

    axios.defaults.headers.common[
        'authorization'
    ] = `Bearer ${cookies['nextauth.shooferta.frontend.token']}`

    const api = axios.create({
        baseURL: `https://${host.WEBHOST}`
        //baseURL: `http://localhost:3336`
    })

    api.interceptors.response.use(
        res => {
            return res
        },
        (error: AxiosError) => {
            if (error?.response?.status === 401) {
                if (
                    (error.response?.data as TodoErrorResponse).message.name ===
                    'TokenExpiredError'
                ) {
                    cookies = parseCookies(ctx)

                    const {
                        'nextauth.shooferta.frontend.refreshToken': refreshToken
                    } = cookies

                    const originalConfig = error.config

                    if (!isRefreshing) {
                        isRefreshing = true

                        api.post('refresh', {
                            token: refreshToken,
                            device
                        })
                            .then(res => {
                                const { token } = res.data

                                setCookie(ctx, logado.nameToken, token, {
                                    maxAge: 60 * 60 * 24 * 30, // 30 days
                                    path: '/',
                                    sameSite: true,
                                    secure: true
                                })

                                setCookie(
                                    ctx,
                                    logado.nameRefreshToken,
                                    res.data.refreshToken,
                                    {
                                        maxAge: 60 * 60 * 24 * 30, // 30 days
                                        path: '/',
                                        sameSite: true,
                                        secure: true
                                    }
                                )

                                api.defaults.headers.common[
                                    'authorization'
                                ] = `Bearer ${token}`

                                failedRequestsQueue.forEach(req =>
                                    req.onSuccess(token)
                                )
                                failedRequestsQueue = []
                            })
                            .catch(err => {
                                failedRequestsQueue.forEach(req =>
                                    req.onFailure(err)
                                )
                                failedRequestsQueue = []

                                if (isServer) {
                                    signOut()
                                }
                            })
                            .finally(() => {
                                isRefreshing = false
                            })
                    }

                    return new Promise((resolve, reject) => {
                        failedRequestsQueue.push({
                            onSuccess: (token: string) => {
                                originalConfig.headers.common[
                                    'authorization'
                                ] = `Bearer ${token}`

                                resolve(api(originalConfig))
                            },
                            onFailure: (err: AxiosError) => {
                                reject(err)
                            }
                        })
                    })
                } else {
                    if (isServer) {
                        signOut()
                    } else {
                        return Promise.reject(new AuthTokenError())
                    }
                }
            }

            return Promise.reject(error)
        }
    )

    return api
}
