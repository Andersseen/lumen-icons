import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnDocumentCurrencyRupeeIcon } from './document-currency-rupee';

describe('LmnDocumentCurrencyRupeeIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnDocumentCurrencyRupeeIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnDocumentCurrencyRupeeIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnDocumentCurrencyRupeeIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
