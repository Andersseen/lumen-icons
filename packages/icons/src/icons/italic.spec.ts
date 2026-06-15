import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnItalicIcon } from './italic';

describe('LmnItalicIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnItalicIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnItalicIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnItalicIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
