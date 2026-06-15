import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnChevronLeftIcon } from './chevron-left';

describe('LmnChevronLeftIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnChevronLeftIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnChevronLeftIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnChevronLeftIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
