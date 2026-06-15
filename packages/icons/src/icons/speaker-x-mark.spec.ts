import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnSpeakerXMarkIcon } from './speaker-x-mark';

describe('LmnSpeakerXMarkIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnSpeakerXMarkIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnSpeakerXMarkIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnSpeakerXMarkIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
