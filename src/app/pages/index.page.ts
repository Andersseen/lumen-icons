import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HomeHeroComponent } from "../components/home/home-hero";
import { HomeFeaturesComponent } from "../components/home/home-features";
import { HomeQuickstartComponent } from "../components/home/home-quickstart";

@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeHeroComponent, HomeFeaturesComponent, HomeQuickstartComponent],
  template: `
    <app-home-hero />
    <app-home-features />
    <app-home-quickstart />
  `,
})
export default class HomePage {}
