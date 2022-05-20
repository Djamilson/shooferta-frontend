import { ContactComponet } from '../../components/Shared/DualPages/ContactComponet'
import { withSSRAuth } from '../../utils/withSSRAuth'

export default function Contacts() {
    return <ContactComponet />
}

export const getServerSideProps = withSSRAuth(
    async ctx => {
        return {
            props: {}
        }
    },
    {
        roles: ['Colaborador']
    }
)
