import { useToast } from '@chakra-ui/react'
import { BrasilAPI } from 'brasilapi'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { IFreight } from '../@model/address/freight'
import { ILocalizationDTO } from '../@model/address/LocaledDTO'
import { ISearchAddress } from '../@model/address/searchAddress'
import { dateFormattedRound } from '../utils/formatDate'
import { formatPrice } from '../utils/formatPrice'
import { apiNextjs } from '../_services/apiNextjs'
import { nextLocaled } from './nextLocaled'

type ICEP = {
    zipCode: string
}

interface LocalizationContextData {
    localed: ILocalizationDTO
    isLocalization: boolean

    getLocalization: (cep: ICEP) => Promise<ISearchAddress>
    getFreight: (localization: ISearchAddress) => Promise<ILocalizationDTO>

    destroyLocalization: () => void
    clearLocalization: () => void
    setLocalization: (localization: ILocalizationDTO) => void
}
type LocalizationProviderProps = {
    children: ReactNode
}

const LocalizationContext = createContext<LocalizationContextData>(
    {} as LocalizationContextData
)

let localedChannel: BroadcastChannel

export function destroyLocalization() {
    destroyCookie(null, nextLocaled.localizationShooferta)
    localedChannel?.postMessage('destroyAddress')
}

function LocalizationProvider({ children }: LocalizationProviderProps) {
    const toast = useToast()

    const [localed, setLocaled] = useState<ILocalizationDTO>()
    const isLocalization = !!localed

    useEffect(() => {
        localedChannel = new BroadcastChannel('localed')

        localedChannel.onmessage = message => {
            switch (message.data) {
                case 'destroyAddress': {
                    setLocaled(null)
                    destroyLocalization()
                    break
                }

                default:
                    break
            }
        }
    }, [])

    const { 'next.localization.shooferta.frontend.localed': oldLocaled } =
        parseCookies()

    useEffect(() => {
        if (oldLocaled) {
            const cookies = parseCookies()
            console.log({ cookies })

            const p = JSON.parse(JSON.stringify(oldLocaled))

            console.log('estou fazendo teste:: ', JSON.stringify(p, null, 4))

            //setLocaled(JSON.parse(JSON.stringify(oldLocaled)))
        }
    }, [])

    async function getLocalization({ zipCode }: ICEP): Promise<ISearchAddress> {
        try {
            const brasilapi = new BrasilAPI()

          const res = await brasilapi.cep(zipCode)

          console.log('Endereço::',res)

            return res as unknown as ISearchAddress
        } catch (error) {
            toast({
                title: 'Erro ao buscar a localização!',
                description:
                    'Não foi possível buscar a localização com os dados inseridos, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    async function getFreight(
        address: ISearchAddress
    ): Promise<ILocalizationDTO> {
        try {
            const { cep } = address

          console.log('Estou calculando o frete!!!')

            const { data } = await apiNextjs.post('/freights', {
                zipCode: cep
            })

            const newLocaled = {
                address,
                freights: {
                    ...data?.map((freight: IFreight) => {
                        return {
                            ...freight,
                            formatedValor: formatPrice(
                                Number(freight.Valor.replace(',', '.'))
                            ),
                            formatedData: dateFormattedRound(
                                Number(freight.PrazoEntrega)
                            )
                        }
                    })
                }
            }

            setLocaled(newLocaled)

            setCookie(
                undefined,
                nextLocaled.localizationShooferta,
                JSON.stringify(newLocaled),
                {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                    sameSite: true,
                    secure: true
                }
            )
            return newLocaled
        } catch (error) {

          console.log('error::: calculo do frete::',error)
            toast({
                title: 'Erro ao buscar a localização!',
                description:
                    'Não foi possível buscar a localização com os dados inseridos, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    async function setLocalization(meLocalization: ILocalizationDTO) {
        try {
            if (meLocalization !== undefined) {
                setCookie(
                    undefined,
                    nextLocaled.localizationShooferta,
                    String(meLocalization),
                    {
                        maxAge: 60 * 60 * 24 * 30, // 30 days
                        path: '/',
                        sameSite: true,
                        secure: true
                    }
                )
            }
        } catch (error) {
            toast({
                title: 'Erro ao buscar a localização!',
                description:
                    'Não foi possível buscar a localização com os dados inseridos, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    function clearLocalization() {
        setLocaled(undefined)
        destroyCookie(null, nextLocaled.localizationShooferta)
    }

    return (
        <LocalizationContext.Provider
            value={{
                localed,
                isLocalization,
                getLocalization,
                getFreight,
                destroyLocalization,
                setLocalization,
                clearLocalization
            }}>
            {children}
        </LocalizationContext.Provider>
    )
}

function useLocalization(): LocalizationContextData {
    const context = useContext(LocalizationContext)

    if (!context) {
        throw new Error(
            'useLocalization mus be used within an LocalizationProvider'
        )
    }

    return context
}

export { LocalizationProvider, useLocalization }
