import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnCommandLineIcon } from './command-line';

describe('LmnCommandLineIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnCommandLineIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnCommandLineIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnCommandLineIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
