import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnHandThumbUpIcon } from './hand-thumb-up';

describe('LmnHandThumbUpIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnHandThumbUpIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnHandThumbUpIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnHandThumbUpIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
