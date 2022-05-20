import { ContactComponet } from '../../components/Shared/DualPages/ContactComponet'
import { withSSRGuest } from '../../utils/withSSRGuest'

export default function Contact() {
    return <ContactComponet />
}

export const getServerSideProps = withSSRGuest(async ctx => {
    return {
        props: {}
    }
})
