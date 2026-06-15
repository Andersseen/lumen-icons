import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnChevronDoubleDownIcon } from './chevron-double-down';

describe('LmnChevronDoubleDownIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnChevronDoubleDownIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnChevronDoubleDownIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnChevronDoubleDownIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
