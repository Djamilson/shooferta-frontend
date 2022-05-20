import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react'

type IProps = {
    title: string
    message: string
}
function MessageComponent({ title, message }: IProps) {
    return (
        <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            color="cinza.825">
            <AlertIcon boxSize="50px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
                {title}
            </AlertTitle>
            <AlertDescription maxWidth="sm">{message}</AlertDescription>
        </Alert>
    )
}

export { MessageComponent }
