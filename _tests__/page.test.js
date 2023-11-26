import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

describe('Home', () => {
    it('Rendering page', () => {
        render(<Home />)

        const img = screen.getByRole('button', {
            name: "Sign in",
        })

        expect(img).toBeInTheDocument()
    })

})


