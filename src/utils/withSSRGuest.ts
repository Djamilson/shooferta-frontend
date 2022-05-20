import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'
import { logado } from '../contexts/logado'
export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)


    if (cookies[logado.nameToken]) {
      return {
          redirect: {
              destination: '/home',
              permanent: false
          }
      }
    }

    return await fn(ctx)
  }
}
