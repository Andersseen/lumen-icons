import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPauseCircleIcon } from './pause-circle';

describe('LmnPauseCircleIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPauseCircleIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPauseCircleIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPauseCircleIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
