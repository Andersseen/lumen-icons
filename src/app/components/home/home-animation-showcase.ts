import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, type Type } from "@angular/core";
import { MOVEMENT_DIRECTIVES } from "angular-movement";
import { LmnAlertCircleIcon } from "@lumen/icons/alert-circle";
import { LmnArrowRightIcon } from "@lumen/icons/arrow-right";
import { LmnCheckIcon } from "@lumen/icons/check";
import { LmnHeartIcon } from "@lumen/icons/heart";
import { LmnHomeIcon } from "@lumen/icons/home";
import { LmnSparklesIcon } from "@lumen/icons/sparkles";
import { VoltCard } from "@voltui/components";

interface AnimationDemo {
  readonly icon: Type<unknown>;
  readonly label: string;
  readonly animate: boolean;
  readonly colorClass: string;
  readonly hoverClasses: string;
}

@Component({
  selector: "app-home-animation-showcase",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, VoltCard, MOVEMENT_DIRECTIVES],
  template: `
    <volt-card
      class="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm"
      aria-label="Live icon animation preview"
      role="region"
    >
      <p class="mb-4 text-lg font-semibold uppercase tracking-widest text-muted-foreground">
        Animations — live preview
      </p>

      <div class="grid grid-cols-2 gap-3">
        @for (demo of demos; track demo.label) {
          <div
            class="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-secondary/70 px-4 py-5 transition-colors"
            [class]="demo.hoverClasses"
            [moveWhileHover]="{ scale: [1, 1.035], y: [0, -2] }"
            [moveWhileTap]="{ scale: [1, 0.98] }"
            [moveDuration]="180"
          >
            <div
              [class]="demo.colorClass"
              [move]="{ opacity: [0, 1], scale: [0.9, 1] }"
              [moveDuration]="260"
            >
              <ng-container
                [ngComponentOutlet]="demo.icon"
                [ngComponentOutletInputs]="{ size: 32, strokeWidth: 1.5, animate: demo.animate }"
              />
            </div>
             <code class="text-[11px] font-mono text-muted-foreground group-hover:text-muted-foreground">
               {{ demo.label }}
             </code>
          </div>
        }
      </div>

      <!-- Code snippet -->
      <div class="mt-3 rounded-lg bg-background px-4 py-3">
        <pre class="text-[12px] leading-relaxed"><code
          ><span style="color:#94a3b8">&lt;</span><span style="color:#c084fc">lmn-check</span
          ><br>  <span style="color:#7dd3fc">[animate]</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"true"</span
          ><br>  <span style="color:#7dd3fc">[size]</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"24"</span
          ><br><span style="color:#94a3b8">/&gt;</span></code></pre>
      </div>
    </volt-card>
  `,
})
export class HomeAnimationShowcaseComponent {
  readonly demos: AnimationDemo[] = [
    {
      icon: LmnCheckIcon,
      label: "check · directive",
      animate: true,
      colorClass: "text-success",
      hoverClasses: "hover:border-success/50 hover:bg-success/20",
    },
    {
      icon: LmnSparklesIcon,
      label: "sparkles · directive",
      animate: true,
      colorClass: "text-primary",
      hoverClasses: "hover:border-primary/50 hover:bg-primary/30",
    },
    {
      icon: LmnArrowRightIcon,
      label: "arrow · directive",
      animate: true,
      colorClass: "text-info",
      hoverClasses: "hover:border-info/50 hover:bg-info/20",
    },
    {
      icon: LmnHomeIcon,
      label: "home · directive",
      animate: true,
      colorClass: "text-secondary-foreground",
      hoverClasses: "hover:border-muted-foreground/50 hover:bg-muted/80",
    },
    {
      icon: LmnHeartIcon,
      label: "heart · engine",
      animate: true,
      colorClass: "text-destructive",
      hoverClasses: "hover:border-destructive/50 hover:bg-destructive/20",
    },
    {
      icon: LmnAlertCircleIcon,
      label: "alert · engine",
      animate: true,
      colorClass: "text-warning",
      hoverClasses: "hover:border-warning/50 hover:bg-warning/20",
    },
  ];
}
