import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import React from 'react'

//React.useLayoutEffect = React.useEffect

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link
                        rel="shortcut icon"
                        href="/favicon.ico"
                        type="image/png"
                    />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />

                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
                        type="text/css"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                        rel="stylesheet"
                    />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        href="https://unpkg.com/swiper/swiper-bundle.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>

                <Script
                    src="https://assets.pagar.me/pagarme-js/4.11/pagarme.min.js"
                    strategy="lazyOnload"
                />
            </Html>
        )
    }
}
