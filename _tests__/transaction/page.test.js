import { render, screen } from '@testing-library/react'
import Transaction from '../../src/app/transaction/page'
import '@testing-library/jest-dom'
import { describe } from 'node:test'



jest.mock('next/navigation');


describe('Transaction', () => {
    jest.mock('next/navigation', () => ({
        useRouter: () => ({
            pathname: '/mocked-path',
            query: { mock: 'query' },
            asPath: '/mocked-path?mock=query',
            push: jest.fn(),
        }),
    }));
    it('Rendering page', () => {
        render(<Transaction />)

        const button = screen.getByRole('button', {
            name: "Make operation",
        })

        expect(button).toBeInTheDocument()
    })
})


