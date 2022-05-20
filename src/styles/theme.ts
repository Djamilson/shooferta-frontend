import { extendTheme } from '@chakra-ui/react'

const activeLabelStyles = {
    transform: 'scale(0.9) translateY(-27px) translateX(-10px)'
}

export const theme = extendTheme({
    colors: {
        principal: {
            '900': '#DC1637',
            '800': '#ab0000',
            '500': '#DC0000'
        },
        black: {
            '900': '#1B1B1F',
            '800': '#211f24',
            '700': '#1a1919',
            '600': '2A2A2A',
            '500': '#000000'
        },
        gray: {
            '900': '#1B1B1F',
            '800': '#1F2029',
            '700': '#353646',
            '600': '#4B4D63',
            '500': '#616480',
            '400': '#797D9A',
            '300': '#9699B0',
            '200': '#B3B5C6',
            '100': '#D1D2DC',
            '75': '#7b7b7b',
            '50': '#EEEEF2',
            '40': '#F4F4F4',
            '30': '#EFEFEF'
        },

        red: {
            '50': '#FDEDEF'
        },

        white: { '900': '#ffffff' },
        cinza: {
            '875': '#29292E',
            '900': '#47474D',
            '850': '#41414D',
            '825': '#4a4a4a',
            '650': '#666666',
            '800': '#7A7A80',
            '750': '#A8A8B3',
            '700': '#AEAEB3',
            '600': '#DEDEE3',
            '500': '#EBEBF0',
            '400': '#F4F5F6',
            '350': '#f8f8f8'
        },
        oranger: {
            '900': '#FF9F00'
        },
        reviews: {
            '900': '#ECDA00',
            '850': '#f7f7bd',
            '800': '#cccccc'
        },

        shapes: {
            '900': ' #29292E',
            '800': 'E1E1E6'
        },

        green: {
            '950': '#40cd28',
            '900': '#03B352',
            '800': '#22543D',
            '700': '#276749',
            '600': '#2F855A',
            '500': '#38A169',
            '400': '#48BB78',
            '300': '#68D391',
            '200': '#9AE6B4',
            '100': '#C6F6D5',
            '50': '#F0FFF4'
        }
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    shadows: {
        outline: '0 0 0 0px #DC1637'
    },
    styles: {
        global: {
            body: {
                bg: 'cinza.400',
                color: 'white.900'
            }
        }
    },
    components: {
        Form: {
            variants: {
                floating: {
                    container: {
                        _focusWithin: {
                            label: {
                                ...activeLabelStyles
                            }
                        },
                        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
                            {
                                ...activeLabelStyles
                            },
                        label: {
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            position: 'absolute',
                            color: 'cinza.650',
                            backgroundColor: 'white.900',
                            pointerEvents: 'none',
                            mx: 3,
                            px: 1,
                            my: 3
                        }
                    }
                }
            }
        }
    }
})
