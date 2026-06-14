import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnH2Icon } from './h2';

describe('LmnH2Icon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnH2Icon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnH2Icon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnH2Icon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
