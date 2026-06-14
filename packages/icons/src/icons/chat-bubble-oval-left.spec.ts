import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnChatBubbleOvalLeftIcon } from './chat-bubble-oval-left';

describe('LmnChatBubbleOvalLeftIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnChatBubbleOvalLeftIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnChatBubbleOvalLeftIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnChatBubbleOvalLeftIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
