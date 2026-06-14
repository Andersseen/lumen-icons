import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnCalendarIcon } from './calendar';

describe('LmnCalendarIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnCalendarIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnCalendarIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnCalendarIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
