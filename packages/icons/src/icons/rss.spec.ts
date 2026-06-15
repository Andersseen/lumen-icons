import { render } from '@testing-library/angular';
import { describe, expect, it } from 'vitest';
import { LmnRssIcon } from './rss';

describe('LmnRssIcon', () => {
  it('renders an svg', async () => {
    const { fixture } = await render(LmnRssIcon);
    expect(fixture.nativeElement.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden by default', async () => {
    const { fixture } = await render(LmnRssIcon);
    expect(fixture.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('accepts animate input as boolean', async () => {
    const { fixture } = await render(LmnRssIcon, {
      componentInputs: { animate: true },
    });
    expect(fixture.componentInstance.animate()).toBe(true);
  });
});
