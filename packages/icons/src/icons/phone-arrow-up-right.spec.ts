import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPhoneArrowUpRightIcon } from './phone-arrow-up-right';

describe('LmnPhoneArrowUpRightIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPhoneArrowUpRightIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPhoneArrowUpRightIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPhoneArrowUpRightIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
