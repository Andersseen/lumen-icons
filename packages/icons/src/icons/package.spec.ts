import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPackageIcon } from './package';

describe('LmnPackageIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPackageIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPackageIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPackageIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
