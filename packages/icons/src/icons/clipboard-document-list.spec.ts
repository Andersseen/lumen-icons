import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnClipboardDocumentListIcon } from './clipboard-document-list';

describe('LmnClipboardDocumentListIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnClipboardDocumentListIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnClipboardDocumentListIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnClipboardDocumentListIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
