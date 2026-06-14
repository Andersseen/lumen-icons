import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnChatBubbleLeftEllipsisIcon } from './chat-bubble-left-ellipsis';

describe('LmnChatBubbleLeftEllipsisIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnChatBubbleLeftEllipsisIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnChatBubbleLeftEllipsisIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnChatBubbleLeftEllipsisIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
