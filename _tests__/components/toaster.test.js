import { render, screen } from '@testing-library/react'
import Toast from './../../src/app/components/common/toaster';
import '@testing-library/jest-dom'
import { describe } from 'node:test'

describe('Toast', () => {
    const mockSetMessage = jest.fn();


    test('renders toast component with correct props', () => {
        render(<Toast type="success" description="Test description" setMessage={mockSetMessage} />);
        const button = screen.getByRole('button', {
            name: "Close",
        })

        expect(button).toBeInTheDocument()

    });
});