import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnTerminalIcon } from './terminal';

describe('LmnTerminalIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnTerminalIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnTerminalIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnTerminalIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
