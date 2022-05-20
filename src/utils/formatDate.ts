import { addDays, endOfHour, format, subHours } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

function dateFormattedRound(numberDays: number): string {
    const nowDate = addDays(Date.now(), numberDays)

    return format(new Date(nowDate), "dd 'de' MMMM", {
        locale: ptBR
    })
}

function dateFormatted(date: string): string {
    const nowDate = subHours(endOfHour(new Date(date)), 3)

    return format(new Date(nowDate), 'dd/MM/yyyy', {
        locale: ptBR
    })
}

function dateFormattedBirthDate(date: string): string {
   
    return format(new Date(date), 'dd/MM/yyyy', {
        locale: ptBR
    })
}

export { dateFormatted, dateFormattedRound, dateFormattedBirthDate }
