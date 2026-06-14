import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnAlertCircleIcon } from './alert-circle';

describe('LmnAlertCircleIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnAlertCircleIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnAlertCircleIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnAlertCircleIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
