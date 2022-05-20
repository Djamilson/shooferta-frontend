import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from '../_services/errors/AuthTokenError'
import decode from 'jwt-decode'
import { validateUserPermissions } from './validateUserPermissions'
import { logado } from '../contexts/logado'
import { useRouter } from 'next/router'

type WithSSRAuthOptios = {
    permission?: string[]
    roles?: string[]
}

export function withSSRAuth<P>(
    fn: GetServerSideProps<P>,
    options?: WithSSRAuthOptios
): GetServerSideProps {
    return async (
        ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        const token = cookies[logado.nameToken]

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        if (options) {
            const user = decode<{ roles: string[] }>(token)

            const { roles } = options

            const userHasValidPermissions = validateUserPermissions({
                user,
                roles
            })

            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: '/home',
                        permanent: false
                    }
                }
            }
        }

        try {
            return await fn(ctx)
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, logado.nameToken)
                destroyCookie(ctx, logado.nameRefreshToken)

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}
