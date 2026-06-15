import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnTableCellsIcon } from './table-cells';

describe('LmnTableCellsIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnTableCellsIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnTableCellsIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnTableCellsIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
