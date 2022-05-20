import { Divider as ChakraDivider, Grid } from '@chakra-ui/react'

export function Line() {
  return (
    <Grid gridTemplateColumns="1fr"  opacity={0.4}>    
      <ChakraDivider marginY={6} />
    </Grid>
  )
}
