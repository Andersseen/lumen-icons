import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnPhotoIcon } from './photo';

describe('LmnPhotoIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnPhotoIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnPhotoIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnPhotoIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
