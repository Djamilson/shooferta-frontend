export function getCardIcon(type: string) {
    const helpers: { [key: string]: string } = {
        'american-express': '/card/americaexpress.jpg',
        aura: '/card/aura.png',
        discover: '/card/discover.png',
        'diners-club': '/card/disnersclub.png',
        maestro: '/card/hipercard.png',
        jcb: '/card/jcb.jpg',
        mastercard: '/card/mastercard.png',
        visa: '/card/visa.png',
        voyage: '/card/voyage.png'
    }

    const type1: string = helpers[type] || '/car.svg'

    return type1
}
