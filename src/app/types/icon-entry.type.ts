import type { Type } from '@angular/core';

export interface IconEntry {
  name: string;
  selector: string;
  component: Type<unknown>;
  importStr: string;
}
