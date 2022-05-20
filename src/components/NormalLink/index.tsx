import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

import { ReactElement, cloneElement } from 'react'

interface NormalLinkProps extends LinkProps {
    children: ReactElement
    shouldMatchExactHref?: boolean
}

export function NormalLink({
    children,
    shouldMatchExactHref = false,
    ...rest
}: NormalLinkProps) {
    const { asPath } = useRouter()
    let isNormal = false

    if (!shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        isNormal = true
    }

    if (
        !shouldMatchExactHref &&
        (asPath.startsWith(String(rest.href)) ||
            asPath.startsWith(String(rest.as)))
    ) {
        isNormal = true
    }
    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isNormal ? 'white.900' : 'cinza.800',
            })}
        </Link>
    )
}
