import { Divider as ChakraDivider, Grid } from '@chakra-ui/react'

export function Horizontal() {
  return (
    <Grid gridTemplateColumns="1fr 1fr"  opacity={0.4}>
      <ChakraDivider marginY={6} />
      <ChakraDivider marginY={6} />
    </Grid>
  )
}
