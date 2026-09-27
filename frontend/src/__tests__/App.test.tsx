import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect } from 'vitest';
//import userEvent from "@testing-library/user-event";
import ReactVite from "../ReactVite.tsx";

describe('App.tsx', () => {
  it('should display heading', () => {
    // Arrange
    render(<ReactVite />);
    // Assert
    expect(
      screen.getByRole('heading', { name: /started/i }),
    ).toBeInTheDocument();
  });

  it('should count button increment counter', async () => {
    // Arrange
    render(<ReactVite />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /0/i });

    expect(screen.getByRole('button', { name: /0/i })).toBeVisible();

    await user.click(button);

    expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
  });
});
