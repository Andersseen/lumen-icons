import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPowerIcon } from './power';

describe('LmnPowerIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPowerIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPowerIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPowerIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
