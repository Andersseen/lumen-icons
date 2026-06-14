import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnArrowDownOnSquareStackIcon } from './arrow-down-on-square-stack';

describe('LmnArrowDownOnSquareStackIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnArrowDownOnSquareStackIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnArrowDownOnSquareStackIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnArrowDownOnSquareStackIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
