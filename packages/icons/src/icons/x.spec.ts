import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnXIcon } from './x';

describe('LmnXIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnXIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnXIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnXIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
