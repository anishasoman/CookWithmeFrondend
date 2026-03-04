import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [HighchartsChartComponent],
  template: `
    <div class="chart-wrapper">
      <highcharts-chart
       
        [constructorType]="chartConstructor"
        [options]="chartOptions"
        class="chart-container"
      ></highcharts-chart>
    </div>
  `,
  styleUrls: ['./graph.css']
})
export class Graph {

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: ChartConstructorType = 'chart';

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      
      backgroundColor: 'transparent',
      
    },

    title: {
      text: 'Weekly Recipe Views',
      style: {
        fontSize: '20px',
        fontWeight: '600'
      }
    },

    subtitle: {
      text: 'Popularity by Category',
      style: {
        color: '#777'
      }
    },

    credits: { enabled: false },

    xAxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      tickmarkPlacement: 'on',
     
    },

    yAxis: {
      title: {
        text: 'Number of Views'
      }
    },

    tooltip: {
      shared: true,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderWidth: 0,
      shadow: true
    },

    plotOptions: {
      area: {
        stacking: 'normal',
        lineWidth: 2,
        marker: {
          enabled: false
        }
      }
    },

    series: [
      {
        type: 'area',
        name: 'Veg Recipes',
        data: [120, 150, 180, 200, 240, 300, 280],
        color: '#ffb703'
      },
      {
        type: 'area',
        name: 'Non-Veg Recipes',
        data: [100, 130, 160, 190, 210, 260, 240],
        color: '#fb8500'
      },
      {
        type: 'area',
        name: 'Desserts',
        data: [80, 90, 120, 140, 170, 220, 200],
        color: '#d00000'
      }
    ]
  };
}