import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBuildingLibraryIcon } from './building-library';

describe('LmnBuildingLibraryIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBuildingLibraryIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBuildingLibraryIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBuildingLibraryIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
