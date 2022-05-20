import { calcularPrecoPrazo } from 'correios-brasil'
type IProps = {
    zipCode: string
}

async function GePriceFreightService({ zipCode }: IProps): Promise<any> {
    try {
        let args = {
            // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
            sCepOrigem: '21770200',
            sCepDestino: zipCode,
            nVlPeso: '1',
            nCdFormato: '1',
            nVlComprimento: '20',
            nVlAltura: '20',
            nVlLargura: '20',
            nCdServico: ['04014', '04510'], //Array com os códigos de serviço
            nVlDiametro: '0'
        }

        const data = await calcularPrecoPrazo(args)

        return data
    } catch (err: any) {
        console.log('carai::::', err)
        throw new Error('Exception message')
    }
}

export { GePriceFreightService }
