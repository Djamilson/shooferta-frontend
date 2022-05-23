import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { useState } from 'react'
import { AnimationLoading } from '../components/Loading/AnimationLoading'
import AppProvider from '../hooks'
import { theme } from '../styles/theme'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState<boolean>(true)

    Router.events.on('routeChangeStart', url => {
         console.log('Route is changing ...',loading)
        setLoading(true)
    })

    Router.events.on('routeChangeComplete', url => {
      console.log('Route is changing sis complete ...', loading)
        setLoading(false)
    })

    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <AppProvider>
                <>
                    {loading && <AnimationLoading />}
                    <Component {...pageProps} />
                </>
            </AppProvider>
        </ChakraProvider>
    )
}

export default MyApp
