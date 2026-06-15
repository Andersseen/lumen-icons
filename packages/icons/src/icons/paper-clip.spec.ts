import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPaperClipIcon } from './paper-clip';

describe('LmnPaperClipIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPaperClipIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPaperClipIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPaperClipIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
