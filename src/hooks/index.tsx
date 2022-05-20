import React, { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from '../contexts/auth'
import { LocalizationProvider } from '../contexts/localization'
import { CartProvider } from '../hooks/useCart'
import { queryClient } from '../_services/queryClient'
import { SidebarDrawerProvider } from './SideBarDrawerContext'

type IProps = {
    children: ReactNode
}

function AppProvider({ children }: IProps) {
    return (
        <LocalizationProvider>
            <CartProvider>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>

                            {children}

                    </QueryClientProvider>
                </AuthProvider>
            </CartProvider>
        </LocalizationProvider>
    )
}
export default AppProvider
