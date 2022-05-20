import { keyframes } from '@chakra-ui/react'

export const itemAnimationRight = keyframes`
 from{
    opacity:0;
    transform: translateX(50px);
  }
  to{
    opacity:1;
    transform: translateX(0px)
  }
`
export const itemAnimationLeft = keyframes`
 from{
    opacity:0;
    transform: translateX(-50px);
  }
  to{
    opacity:1;
    transform: translateX(0px)
  }
`
export const itemAnimationButton = keyframes`
 from{
    opacity:0;
    transform: translateY(50px);
  }
  to{
    opacity:1;
    transform: translateY(0px)
  }
`
export const itemAnimationTop = keyframes`
 from{
    opacity:0;
    transform: translateY(-50px);
  }
  to{
    opacity:1;
    transform: translateY(0px)
  }
`

export const animationItemFloat = keyframes`
  0%{transform: translateY(0px);}
  50%{transform: translateY(-30px);}
  100%{transform: translateY(0px);}
`
