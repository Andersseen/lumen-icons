import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnSquare2StackIcon } from './square-2-stack';

describe('LmnSquare2StackIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnSquare2StackIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnSquare2StackIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnSquare2StackIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
