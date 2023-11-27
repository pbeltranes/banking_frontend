import { render, screen } from '@testing-library/react'
import Layout from '../src/app/layout'
import '@testing-library/jest-dom'

describe('Layout', () => {
    jest.mock('next/font/google', () => ({}));
    jest.mock('../src/app/globals.css', () => ({}));
    it('Rendering page', () => {
        const { getByText } = render(<Layout>Test Content</Layout>)

        expect(getByText('Test Content')).toBeInTheDocument();

    })

})


