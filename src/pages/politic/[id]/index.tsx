import IPolitic from '../../../@model/politic/politic'
import { PoliticComponent } from '../../../components/Shared/DualPages/PoliticComponent'
import { withSSRGuest } from '../../../utils/withSSRGuest'

type IProps = {
    politic: IPolitic
}

export default function Politic({ politic }: IProps) {
    return <PoliticComponent meInitPolitic={politic} />
}

export const getServerSideProps = withSSRGuest(async ctx => {
    const { params, query } = ctx

    console.log('=>>id', params)
    console.log('=>>query', query)
    return {
        props: {}
    }
})
