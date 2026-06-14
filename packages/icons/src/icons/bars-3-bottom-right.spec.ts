import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBars3BottomRightIcon } from './bars-3-bottom-right';

describe('LmnBars3BottomRightIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBars3BottomRightIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBars3BottomRightIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBars3BottomRightIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
