import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnDocumentMagnifyingGlassIcon } from './document-magnifying-glass';

describe('LmnDocumentMagnifyingGlassIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnDocumentMagnifyingGlassIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnDocumentMagnifyingGlassIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnDocumentMagnifyingGlassIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
