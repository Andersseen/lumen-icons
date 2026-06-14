import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnWrenchIcon } from './wrench';

describe('LmnWrenchIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnWrenchIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnWrenchIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnWrenchIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
