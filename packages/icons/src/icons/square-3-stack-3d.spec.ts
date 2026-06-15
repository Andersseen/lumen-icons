import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnSquare3Stack3dIcon } from './square-3-stack-3d';

describe('LmnSquare3Stack3dIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnSquare3Stack3dIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnSquare3Stack3dIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnSquare3Stack3dIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
