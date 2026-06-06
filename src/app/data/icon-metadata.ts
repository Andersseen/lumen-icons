export type IconCategory =
  | 'actions'
  | 'communication'
  | 'content'
  | 'editor'
  | 'feedback'
  | 'media'
  | 'navigation'
  | 'security'
  | 'status'
  | 'system';

export interface IconMetadata {
  readonly category: IconCategory;
  readonly aliases: readonly string[];
}

export interface IconCategoryOption {
  readonly value: IconCategory;
  readonly label: string;
}

export const ICON_CATEGORIES: readonly IconCategoryOption[] = [
  { value: 'actions', label: 'Actions' },
  { value: 'communication', label: 'Communication' },
  { value: 'content', label: 'Content' },
  { value: 'editor', label: 'Editor' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'media', label: 'Media' },
  { value: 'navigation', label: 'Navigation' },
  { value: 'security', label: 'Security' },
  { value: 'status', label: 'Status' },
  { value: 'system', label: 'System' },
] as const;

export const ICON_CATEGORY_LABELS = Object.fromEntries(
  ICON_CATEGORIES.map(category => [category.value, category.label]),
) as Record<IconCategory, string>;

export const ICON_METADATA: Record<string, IconMetadata> = {
  'alert-circle': { category: 'feedback', aliases: ['alert', 'warning', 'error', 'notice'] },
  'arrow-left': { category: 'navigation', aliases: ['back', 'previous', 'return'] },
  'arrow-right': { category: 'navigation', aliases: ['next', 'forward', 'continue'] },
  avatar: { category: 'system', aliases: ['person', 'profile', 'account', 'user'] },
  badge: { category: 'status', aliases: ['pill', 'label', 'tag', 'status'] },
  bell: { category: 'feedback', aliases: ['notification', 'alarm', 'alert'] },
  bold: { category: 'editor', aliases: ['text', 'format', 'strong'] },
  calendar: { category: 'content', aliases: ['date', 'event', 'schedule'] },
  camera: { category: 'media', aliases: ['photo', 'capture', 'picture'] },
  check: { category: 'status', aliases: ['success', 'done', 'complete', 'tick'] },
  checkbox: { category: 'status', aliases: ['checkmark', 'todo', 'selected'] },
  'chevron-down': { category: 'navigation', aliases: ['expand', 'open', 'dropdown'] },
  'chevron-right': { category: 'navigation', aliases: ['next', 'expand', 'forward'] },
  clock: { category: 'content', aliases: ['time', 'recent', 'history'] },
  copy: { category: 'actions', aliases: ['duplicate', 'clipboard', 'clone'] },
  download: { category: 'actions', aliases: ['save', 'export', 'arrow'] },
  edit: { category: 'actions', aliases: ['write', 'compose', 'pencil'] },
  'external-link': { category: 'navigation', aliases: ['open', 'new tab', 'outside'] },
  eye: { category: 'system', aliases: ['view', 'preview', 'visible', 'show'] },
  file: { category: 'content', aliases: ['document', 'page', 'paper'] },
  folder: { category: 'content', aliases: ['directory', 'files', 'archive'] },
  github: { category: 'system', aliases: ['brand', 'repo', 'source'] },
  heart: { category: 'feedback', aliases: ['like', 'favorite', 'love'] },
  home: { category: 'navigation', aliases: ['house', 'dashboard', 'start'] },
  image: { category: 'media', aliases: ['picture', 'photo', 'gallery'] },
  info: { category: 'feedback', aliases: ['help', 'about', 'details'] },
  italic: { category: 'editor', aliases: ['text', 'format', 'emphasis'] },
  link: { category: 'actions', aliases: ['url', 'chain', 'connect'] },
  lock: { category: 'security', aliases: ['secure', 'private', 'password'] },
  mail: { category: 'communication', aliases: ['email', 'message', 'inbox'] },
  'map-pin': { category: 'content', aliases: ['location', 'place', 'address'] },
  menu: { category: 'navigation', aliases: ['hamburger', 'nav', 'list'] },
  moon: { category: 'system', aliases: ['dark', 'theme', 'night'] },
  'more-vertical': { category: 'actions', aliases: ['kebab', 'overflow', 'options'] },
  paperclip: { category: 'actions', aliases: ['attachment', 'attach', 'file'] },
  phone: { category: 'communication', aliases: ['call', 'contact', 'mobile'] },
  plus: { category: 'actions', aliases: ['add', 'create', 'new'] },
  radio: { category: 'status', aliases: ['option', 'select', 'choice'] },
  search: { category: 'actions', aliases: ['find', 'magnifier', 'lookup'] },
  settings: { category: 'system', aliases: ['preferences', 'controls', 'gear'] },
  share: { category: 'actions', aliases: ['send', 'forward', 'social'] },
  shield: { category: 'security', aliases: ['protect', 'safe', 'verified'] },
  smile: { category: 'feedback', aliases: ['emoji', 'happy', 'reaction'] },
  sparkles: { category: 'feedback', aliases: ['magic', 'ai', 'new', 'shine'] },
  star: { category: 'feedback', aliases: ['favorite', 'rating', 'bookmark'] },
  sun: { category: 'system', aliases: ['light', 'theme', 'day'] },
  trash: { category: 'actions', aliases: ['delete', 'remove', 'bin'] },
  upload: { category: 'actions', aliases: ['import', 'send', 'arrow'] },
  user: { category: 'system', aliases: ['person', 'profile', 'account'] },
  x: { category: 'actions', aliases: ['close', 'dismiss', 'cancel'] },
  zap: { category: 'feedback', aliases: ['bolt', 'fast', 'energy'] },
};
