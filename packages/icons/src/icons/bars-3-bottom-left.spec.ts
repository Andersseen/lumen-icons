import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBars3BottomLeftIcon } from './bars-3-bottom-left';

describe('LmnBars3BottomLeftIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBars3BottomLeftIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBars3BottomLeftIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBars3BottomLeftIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
