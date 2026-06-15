import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnBuildingOffice2Icon } from './building-office-2';

describe('LmnBuildingOffice2Icon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnBuildingOffice2Icon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnBuildingOffice2Icon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnBuildingOffice2Icon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
