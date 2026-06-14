import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnChartPieIcon } from './chart-pie';

describe('LmnChartPieIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnChartPieIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnChartPieIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnChartPieIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
