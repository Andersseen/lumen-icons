import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBattery100Icon } from './battery-100';

describe('LmnBattery100Icon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBattery100Icon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBattery100Icon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBattery100Icon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
