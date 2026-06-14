import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnSquares2x2Icon } from './squares-2x2';

describe('LmnSquares2x2Icon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnSquares2x2Icon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnSquares2x2Icon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnSquares2x2Icon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
