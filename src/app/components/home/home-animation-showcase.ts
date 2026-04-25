import { NgComponentOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LmnAlertCircleIcon } from "@lumen/icons/alert-circle";
import { LmnArrowRightIcon } from "@lumen/icons/arrow-right";
import { LmnHeartIcon } from "@lumen/icons/heart";
import { LmnStarIcon } from "@lumen/icons/star";
import { VoltCard } from "@voltui/components";

@Component({
  selector: "app-home-animation-showcase",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, VoltCard],
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
        @for (demo of demos; track demo.animate) {
          <div
            class="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-secondary/70 px-4 py-5 transition-colors"
            [class]="demo.hoverClasses"
          >
            <div [class]="demo.colorClass">
              <ng-container
              [ngComponentOutlet]="demo.icon"
              [ngComponentOutletInputs]="{ size: 32, strokeWidth: 1.5, animate: demo.animate }"
            />
            </div>
            <code class="text-[11px] font-mono text-muted-foreground group-hover:text-muted-foreground">
              animate="{{ demo.animate }}"
            </code>
          </div>
        }
      </div>

      <!-- Code snippet -->
      <div class="mt-3 rounded-lg bg-background px-4 py-3">
        <pre class="text-[12px] leading-relaxed"><code
          ><span style="color:#94a3b8">&lt;</span><span style="color:#c084fc">lmn-star</span
          ><br>  <span style="color:#7dd3fc">animate</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"spin"</span
          ><br>  <span style="color:#7dd3fc">[size]</span><span style="color:#94a3b8">=</span><span style="color:#86efac">"24"</span
          ><br><span style="color:#94a3b8">/&gt;</span></code></pre>
      </div>
    </volt-card>
  `,
})
export class HomeAnimationShowcaseComponent {
  readonly demos = [
    {
      icon: LmnStarIcon,
      animate: "spin" as const,
      colorClass: "text-primary",
      hoverClasses: "hover:border-primary/50 hover:bg-primary/30",
    },
    {
      icon: LmnHeartIcon,
      animate: "pulse" as const,
      colorClass: "text-destructive",
      hoverClasses: "hover:border-destructive/50 hover:bg-destructive/20",
    },
    {
      icon: LmnArrowRightIcon,
      animate: "bounce" as const,
      colorClass: "text-info",
      hoverClasses: "hover:border-info/50 hover:bg-info/20",
    },
    {
      icon: LmnAlertCircleIcon,
      animate: "ping" as const,
      colorClass: "text-warning",
      hoverClasses: "hover:border-warning/50 hover:bg-warning/20",
    },
  ];
}
