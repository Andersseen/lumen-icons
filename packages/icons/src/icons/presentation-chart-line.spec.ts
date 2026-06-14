import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPresentationChartLineIcon } from './presentation-chart-line';

describe('LmnPresentationChartLineIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPresentationChartLineIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPresentationChartLineIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPresentationChartLineIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
