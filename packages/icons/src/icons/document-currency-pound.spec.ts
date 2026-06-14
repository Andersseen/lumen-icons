import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnDocumentCurrencyPoundIcon } from './document-currency-pound';

describe('LmnDocumentCurrencyPoundIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnDocumentCurrencyPoundIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnDocumentCurrencyPoundIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnDocumentCurrencyPoundIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
