import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBars3CenterLeftIcon } from './bars-3-center-left';

describe('LmnBars3CenterLeftIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBars3CenterLeftIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBars3CenterLeftIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBars3CenterLeftIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
