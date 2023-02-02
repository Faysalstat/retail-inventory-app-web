import { Component, OnInit } from '@angular/core';
import * as CanvasJSAngularChart from '../../../../assets/canvas/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@Component({
  selector: 'app-visual-dashboard',
  templateUrl: './visual-dashboard.component.html',
  styleUrls: ['./visual-dashboard.component.css']
})
export class VisualDashboardComponent implements OnInit {
  chart: any;
  months:any[] = ["Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep", "Oct","Nov","Dec"];
	chartOptions = {
	  animationEnabled: true,
	  theme: "light2",
	  title:{
		text: "Revenue Analysis"
	  },
	  axisY: {
		title: "Number of Orders",
		includeZero: true
	  },
	  axisY2: {
		title: "Total Revenue",
		includeZero: true,
		labelFormatter: (e:any) => {
			var suffixes = ["", "Lac", "M", "B"];
 
			var order = Math.max(Math.floor(Math.log(e.value) / Math.log(10000)), 0);
			if(order > suffixes.length - 1)
				order = suffixes.length - 1;
 
			var suffix = suffixes[order];
			return '$' + (e.value / Math.pow(10000, order)) + suffix;
		}
	  },
	  toolTip: {
		shared: true
	  },
	  legend: {
		cursor: "pointer",
		itemclick: function (e: any) {
			if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else {
				e.dataSeries.visible = true;
			} 
			e.chart.render();
		}
	  },
	  data: [{
		type: "column",
		showInLegend: true,
		name: "Sale",
		axisYType: "secondary",
		yValueFormatString: "$#,###",
		dataPoints: [
			{ label: "Jan", y: 250000 },
			{ label: "Feb", y: 431000 },
			{ label: "Mar", y: 646000 },
			{ label: "Apr", y: 522000 },
			{ label: "May", y: 464000 },
			{ label: "Jun", y: 470000 },
			{ label: "Jul", y: 534000 },
			{ label: "Aug", y: 407000 },
			{ label: "Sep", y: 484000 },
			{ label: "Oct", y: 465000 },
			{ label: "Nov", y: 424000 },
			{ label: "Dec", y: 231000 }
		]
	  },{
      type: "column",
      showInLegend: true,
      name: "Purchase",
      axisYType: "secondary",
      yValueFormatString: "$#,###",
      dataPoints: [
        { label: "Jan", y: 200000 },
        { label: "Feb", y: 531000 },
        { label: "Mar", y: 104000 },
        { label: "Apr", y: 122000 },
        { label: "May", y: 46000 },
        { label: "Jun", y: 970000 },
        { label: "Jul", y: 994000 },
        { label: "Aug", y: 127000 },
        { label: "Sep", y: 480000 },
        { label: "Oct", y: 421000 },
        { label: "Nov", y: 521000 },
        { label: "Dec", y: 291000 }
      ]
      },{
		type: "spline",
		showInLegend: true,
		name: "No of Orders",
		dataPoints: [
			{ label: "Jan", y: 372 },
			{ label: "Feb", y: 412 },
			{ label: "Mar", y: 572 },
			{ label: "Apr", y: 224 },
			{ label: "May", y: 246 },
			{ label: "Jun", y: 601 },
			{ label: "Jul", y: 642 },
			{ label: "Aug", y: 590 },
			{ label: "Sep", y: 527 },
			{ label: "Oct", y: 273 },
			{ label: "Nov", y: 251 },
			{ label: "Dec", y: 331 }
		]
	  }]
	}	
  constructor() { }

  ngOnInit(): void {
  }

}
