import IPolitic from '../../../@model/politic/politic'
import { PoliticComponent } from '../../../components/Shared/DualPages/PoliticComponent'
import { withSSRAuth } from '../../../utils/withSSRAuth'

type IProps = {
    politic: IPolitic
}

export default function Politics({ politic }: IProps) {
    return <PoliticComponent meInitPolitic={politic} />
}

export const getServerSideProps = withSSRAuth(
    async ctx => {
         const { params, query } = ctx

         console.log('=>>id', params)
         console.log('=>>query', query)

        return {
            props: {}
        }
    },
    {
        roles: ['Colaborador']
    }
)
