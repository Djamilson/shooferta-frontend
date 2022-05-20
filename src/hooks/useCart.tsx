import { useToast } from '@chakra-ui/react'
import Router from 'next/router'
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from 'react'
import { INewProduct } from '../@model/product/productCart'
import { api } from '../_services/apiClient'
import {
    createForgottenCarts,
    updateForgottenCarts
} from './Entity/useForgottenCartAll'

export type IProductAmount = {
    amount: number
    product_id: string
    isAuthenticated: boolean
}

type IAddProduct = {
    isAuthenticated: boolean
    productId: string
    href: string
}

interface CartContextData {
    cart: INewProduct[]
    setCart: Dispatch<SetStateAction<INewProduct[]>>
    addProduct: ({ productId, href }: IAddProduct) => Promise<void>
    clearCart(): void
    removeProduct: (productId: string, isAuthenticated: boolean) => void
    updateProductAmount: ({ product_id }: IProductAmount) => Promise<void>
}

type CartProviderProps = {
    children: ReactNode
}

const CartContext = createContext<CartContextData>({} as CartContextData)

let CartChannel: BroadcastChannel

export function clearMeCart() {
    CartChannel?.postMessage('clearMeCart')
}

function CartProvider({ children }: CartProviderProps) {
    const toast = useToast()

    const [cart, setCart] = useState<INewProduct[]>(() => {
        return [] as INewProduct[]
    })

    useEffect(() => {
        CartChannel = new BroadcastChannel('cart')
        CartChannel.onmessage = message => {
            switch (message.data) {
                case 'clearMeCart': {
                    setCart(null)
                    clearCart()
                    break
                }

                default:
                    break
            }
        }
    }, [])

    async function updateSuccess({
        product_id,
        amount,
        isAuthenticated
    }: IProductAmount) {
        try {
            const newCart = cart

            const productIndex = newCart.findIndex(
                p => p.product.id === product_id
            )

            if (productIndex >= 0) {
                if (Number(newCart[productIndex].amount) < Number(amount)) {
                    toast({
                        title: 'Adicionado',
                        description:
                            'Você alterou a quatidade do produto com sucesso!',
                        status: 'success',
                        duration: 3000,
                        position: 'top-right',
                        isClosable: true
                    })
                } else {
                    toast({
                        title: 'Removido',
                        description:
                            'Você alterou a quatidade do produto com sucesso!',
                        status: 'success',
                        duration: 3000,
                        position: 'top-right',
                        isClosable: true
                    })
                }

                console.log('Vou setar o producto:', isAuthenticated)

                newCart[productIndex].amount = Number(amount)

                setCart([...newCart])

                console.log('isAuthenticated', isAuthenticated)
                //autalizando carrinho no banco
                if (isAuthenticated) {
                    updateForgottenCarts({
                        amount: amount,
                        product_id: newCart[productIndex].product.id
                    })
                }
            }
        } catch (error) {
            toast({
                title: 'Adicionado',
                description: 'Erro na alteração de quantidade do produto',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
            throw new Error(error)
        }
    }

    async function updateProductAmount({
        product_id,
        amount,
        isAuthenticated
    }: IProductAmount) {
        try {
            if (amount < 1) {
                toast({
                    title: 'Error',
                    description: 'Erro na alteração de quantidade do produto',
                    status: 'error',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })
                return
            }

            const { data } = await api.get(`stocks/products/${product_id}`)

            console.log('Total stock:::', data)
            const productstock = data.total

            if (amount > Number(productstock)) {
                toast({
                    title: 'Error',
                    description: 'Quantidade solicitada fora de estoque',
                    status: 'error',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })
                return
            }

            updateSuccess({ product_id, amount, isAuthenticated })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Erro na alteração de quantidade do produto',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    async function removeProduct(id: string, isAuthenticated: boolean) {
        try {
            const removeCart = cart

            const productExists = removeCart.some(
                cartProduct => cartProduct.product.id === id
            )
            console.log('Estou tentanod remover!')

            if (!productExists) {
                toast({
                    title: 'Error',
                    description: 'Erro na remoção do produto',
                    status: 'error',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })
                return
            }

            const productIndex = removeCart.findIndex(p => p.product.id === id)

            if (productIndex >= 0) {
                console.log('Entrou no if!')
                removeCart.splice(productIndex, 1)
                setCart([...removeCart])

                toast({
                    title: 'Sucesso',
                    description: 'Produto removido da cesta com sucesso!',
                    status: 'success',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Erro na remoção do produto',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    function clearCart() {
        clearMeCart()
        setCart(() => {
            return [] as INewProduct[]
        })
    }

    async function addProduct({
        productId,
        href,
        isAuthenticated
    }: IAddProduct) {
        try {
            const newCart = cart

            const productExists = newCart.find(
                (p: INewProduct) => p.product.id === productId
            )

            const { data } = await api.get(`stocks/products/${productId}`)

            const stockAmount = data.total
            const currentAmount = productExists ? productExists.amount : 0

            const amount = currentAmount + 1

            if (amount > stockAmount) {
                toast({
                    title: 'Error',
                    description: 'Não temos mais produto para adicionar!',
                    status: 'error',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })

                return
            }

            if (productExists) {
                updateSuccess({
                    product_id: productId,
                    amount,
                    isAuthenticated
                })
            } else {
                const res = await api.get(`products/${productId}`)

                const { data } = res

                const item = { amount: 1, product: { ...data } }

                newCart.push(item)

                setCart([...newCart])

                toast({
                    title: 'Sucesso',
                    description: 'Produto adicionado a cesta com sucesso!',
                    status: 'success',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })

                //create cart mongodb
                isAuthenticated &&
                    (await createForgottenCarts({
                        product_id: item.product.id,
                        amount: 1
                    }))
            }

            // /basket or /baskets
            Router.push(href)
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Erro ao tentar adicionar o produto!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
            throw new Error(error)
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addProduct,
                updateProductAmount,
                removeProduct,
                clearCart,
                setCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

function useCart(): CartContextData {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart mus be used within an CartProvider')
    }

    return context
}

export { CartProvider, useCart }
