import { ActiveLink } from '.'

import { render } from '@testing-library/react'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink compnent', () => {
    it('renders correctly', () => {
        /* const { debug } = render(
        <ActiveLink href="/">
            <a>Home</a>
        </ActiveLink>
    )

    debug()*/

        const { getByText } = render(
            <ActiveLink href="/">
                <a>Home</a>
            </ActiveLink>
        )

        expect(getByText('Home')).toBeInTheDocument()
    })
})
