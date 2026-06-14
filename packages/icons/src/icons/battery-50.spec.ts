import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBattery50Icon } from './battery-50';

describe('LmnBattery50Icon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBattery50Icon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBattery50Icon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBattery50Icon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
