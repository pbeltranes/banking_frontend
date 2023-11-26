import { render, screen } from '@testing-library/react'
import Transaction from '../../src/app/transaction/page'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import { describe } from 'node:test'

describe('Home', () => {
    it('Rendering page', () => {
        render(<Transaction />)

        const button = screen.getByRole('button', {
            name: "Make operation",
        })

        expect(button).toBeInTheDocument()
    })
})


