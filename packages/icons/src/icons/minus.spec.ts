import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnMinusIcon } from './minus';

describe('LmnMinusIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnMinusIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnMinusIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnMinusIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
