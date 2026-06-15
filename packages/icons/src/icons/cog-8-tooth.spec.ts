import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnCog8ToothIcon } from './cog-8-tooth';

describe('LmnCog8ToothIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnCog8ToothIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnCog8ToothIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnCog8ToothIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
