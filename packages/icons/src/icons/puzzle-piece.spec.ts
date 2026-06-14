import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPuzzlePieceIcon } from './puzzle-piece';

describe('LmnPuzzlePieceIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPuzzlePieceIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPuzzlePieceIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPuzzlePieceIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
