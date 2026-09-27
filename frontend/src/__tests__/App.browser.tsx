import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from '../App.tsx'
import { page } from 'vitest/browser'
import {getByRole} from "@testing-library/react";

test.skip('should render heading and count button', async () => {
    await render(<App />)

    const el = document.body // or querySelector(...)
    const button = el.querySelector('button');
    const heading = el.querySelector('h1');

    await expect.element(button).toBeInTheDocument();
    await expect.element(heading).toHaveTextContent(/Get Started$/i);
    // Or
    await expect.element(el.querySelector('button')).toBeInTheDocument()
})

test.skip('should Aoo component handles user interaction', async () => {
    // Use Testing Library to render the component
    const { baseElement, getByRole } = await render(
        <App />
    );

    // Bridge to Vitest's browser mode for interactions and assertions
    const screen = page.elementLocator(baseElement);

    // Use Vitest's page queries for finding elements
    const incrementButton = screen.getByRole('button', { name: /count is 0/i });

    // Use Vitest's assertions and interactions
    await expect.element(screen.getByText('Count is 0')).toBeInTheDocument()

    // Trigger user interaction using Vitest's page API
    await incrementButton.click()

    await expect.element(screen.getByText('Count is 1')).toBeInTheDocument()
})