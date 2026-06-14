import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnRadioIcon } from './radio';

describe('LmnRadioIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnRadioIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnRadioIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnRadioIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
