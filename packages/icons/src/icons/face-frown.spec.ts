import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnFaceFrownIcon } from './face-frown';

describe('LmnFaceFrownIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnFaceFrownIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnFaceFrownIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnFaceFrownIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
