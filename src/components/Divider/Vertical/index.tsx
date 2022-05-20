import { Divider as ChakraDivider, Grid, DividerProps } from '@chakra-ui/react'

interface IProps extends DividerProps {}

export function Vertical({ ...rest }: IProps) {
    return (
        <Grid gridTemplateColumns="1fr" columnGap={12} opacity={0.4}>
            <ChakraDivider
                orientation="vertical"
                marginY={6}
                color="red"
                {...rest}
            />
        </Grid>
    )
}
