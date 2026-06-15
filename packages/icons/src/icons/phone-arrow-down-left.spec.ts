import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPhoneArrowDownLeftIcon } from './phone-arrow-down-left';

describe('LmnPhoneArrowDownLeftIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPhoneArrowDownLeftIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPhoneArrowDownLeftIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPhoneArrowDownLeftIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
