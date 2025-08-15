import { Component, ViewEncapsulation } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports : [CommonModule]
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}