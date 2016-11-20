angular.module('myModule', []).controller('myController', function ($scope) {
	var self = this;

	this.color = ['#ff6c0a','#0aff12','#f6ff0a','#ffaa00','#ffdd88','#000000','#abfc88','#1fc445','#10e5b0','#126e7a','#a504e0','#e0044a'];
	this.colorIndex = 0;

	this.attributes = [{
		id : 0,
		name : "Trump's Hair",
		data : [12.5, 22.5, 33.4, 41.2, 12.0, 66.0, 21.6, 35.5],
		toggle : false
	},{
		id : 1,
		name : "Hillary's Lies",
		data : [1.5, 16.5, -32.4, -88.2, 72.0, 35.0, 23.6, -56.5],
		toggle : false
	},{
		id : 2,
		name : "Trump's Wall",
		data : [100.0, 98.0, 73.3, 88.9, 92.0, 71.2, 85.9, 99.9],
		toggle : false
	}];

	this.option = {
		title: {
            text: 'Sentiment Percentage of American Presidential Candidate',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: Twitter, from 12/11/16 - 19/11/16',
            x: -20
        },
	    xAxis: {
	        categories: ['12/11/16', '13/11/16', '14/11/16', '15/11/16', '16/11/16', '17/11/16', 
	            '18/11/16', '19/11/16']
	    },
	    yAxis: {
            title: {
                text: 'Voting Sentiment'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
	}
	this.option.series = [{
		name : "Hillary",
		data : [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5],
		color : '#4473ff'
	},{
		name : "Trump",
		data : [55.5, 32.5, 81.4, 71.2, 123.0, 21.0, 20.6, 56.5],
		color: '#ff4444'
	}];

	this.init = function(){
		for(var i =0; i<this.attributes.length;i++){
			this.attributes[i].color=this.color[this.colorIndex];
			this.colorIndex = (this.colorIndex + 1) % this.color.length;
		}
	}

	this.add = function(item){
		this.option.series.push(item);
		Highcharts.chart('graph', this.option);
	}

	this.del = function(item){
		for(var i = 2;i<this.option.series.length;i++){
			if(item.id==this.option.series[i].id){
				console.log(item.name);
				this.option.series.splice(i,1);
			}
		}
		Highcharts.chart('graph', this.option);
	}

	this.toggle = function(item){
		if(item.toggle){
			console.log("berhasil");
			this.add(item);
		}else{
			this.del(item);
			console.log("deleted");
		}
	}

	Highcharts.chart('graph', this.option);
});