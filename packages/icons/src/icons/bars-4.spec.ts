import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBars4Icon } from './bars-4';

describe('LmnBars4Icon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBars4Icon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBars4Icon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBars4Icon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
