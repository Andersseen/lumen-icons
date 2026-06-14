import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnArrowTopRightOnSquareIcon } from './arrow-top-right-on-square';

describe('LmnArrowTopRightOnSquareIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnArrowTopRightOnSquareIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnArrowTopRightOnSquareIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnArrowTopRightOnSquareIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
