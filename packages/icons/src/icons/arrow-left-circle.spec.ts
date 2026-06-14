import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnArrowLeftCircleIcon } from './arrow-left-circle';

describe('LmnArrowLeftCircleIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnArrowLeftCircleIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnArrowLeftCircleIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnArrowLeftCircleIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
