import { useEffect, useState } from 'react'

const UseStickyHeader = () => {
    const [isSticky, setIsSticky] = useState<boolean>(false)
    const [position, setPosition] = useState('none')
    const [clientWindowHeight, setClientWindowHeight] = useState<string>('')
    const [backgroundTransparacy, setBackgroundTransparacy] = useState(0)
    const [padding, setPadding] = useState(30)
    const [boxShadow, setBoxShadow] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
        setClientWindowHeight(String(window.scrollY))
    }

    useEffect(() => {
        let backgroundTransparacyVar = Number(clientWindowHeight) / 280

        if (backgroundTransparacyVar < 1) {
            let paddingVar = 30 - backgroundTransparacyVar * 20
            let boxShadowVar = backgroundTransparacyVar * 0.1

            setBackgroundTransparacy(backgroundTransparacyVar)
            setPadding(paddingVar)
            setBoxShadow(boxShadowVar)
            setIsSticky(true)
        } else {
            setIsSticky(false)
        }
    }, [clientWindowHeight])

    return { isSticky, backgroundTransparacy, boxShadow, padding, position }
}

export default UseStickyHeader
