import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnShieldCheckIcon } from './shield-check';

describe('LmnShieldCheckIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnShieldCheckIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnShieldCheckIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnShieldCheckIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
