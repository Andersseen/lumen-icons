import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBars2Icon } from './bars-2';

describe('LmnBars2Icon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBars2Icon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBars2Icon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBars2Icon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
