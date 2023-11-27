import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

// Mock the useRouter function
jest.mock('next/navigation');


describe('Home', () => {
    jest.mock('next/navigation', () => ({
        useRouter: () => ({
            pathname: '/mocked-path',
            query: { mock: 'query' },
            asPath: '/mocked-path?mock=query',
            push: jest.fn(),
        }),
    }));
    it('Rendering page', () => {
        render(<Home />)

        const img = screen.getByRole('button', {
            name: "Sign in",
        })

        expect(img).toBeInTheDocument()
    })

})


