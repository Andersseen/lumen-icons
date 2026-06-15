import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnExternalLinkIcon } from './external-link';

describe('LmnExternalLinkIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnExternalLinkIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnExternalLinkIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnExternalLinkIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
