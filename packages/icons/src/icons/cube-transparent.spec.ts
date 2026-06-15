import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnCubeTransparentIcon } from './cube-transparent';

describe('LmnCubeTransparentIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnCubeTransparentIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnCubeTransparentIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnCubeTransparentIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
