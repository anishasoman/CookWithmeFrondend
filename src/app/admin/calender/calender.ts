import { DatePipe } from '@angular/common';
import {ChangeDetectionStrategy, Component, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-calender',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule,DatePipe,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.html',
  styleUrl: './calender.css',
})
export class Calender {
 selected = model<Date | null>(new Date());
}
