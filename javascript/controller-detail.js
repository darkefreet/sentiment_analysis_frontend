angular.module('myModule', []).controller('myController', function ($scope,$http) {
	var self = this;
	var getRandomColor = function() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

    this.option = {
		title: {
            text: 'Detail Sentiment Percentage of American Presidential Candidate',
            x: -20 //center
        },
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        subtitle: {
            text: 'Source: Twitter, from 12/11/16 - 19/11/16',
            x: -20
        },
	    xAxis: {
	    	title:{
	    		enabled : true,
	    		text:'Total Tweets'
	    	},
	    	startOnTick: true,
            endOnTick: true,
            showLastLabel: true
	    },
	    yAxis: {
            title: {
                text: 'Percent Sentiment'
            }
        },
        tooltip: {
            valueSuffix: ' %positive'
        },
        series: []
	}
	var tempA = [];
	var tempB = [];

	this.init = function(){
		$http({
	        method : "GET",
	        url : "data/sentiment.php?candidate=1"
	    }).then(function(response){
	    	var result = response.data;
	    	for(var resp in result){
	    		var a = JSON.parse(result[resp]);
	    		if(a!=false){
	    			a.color=getRandomColor();
		    		a.data[0] = Number(a.data[0]);
		    		a.data[1] = Number(a.data[1]);
		    		var arr = [];
		    		arr.push(a.data);
		    		a.data = arr;
		    		tempA.push(a);
	    		}
	    	}
	    });

	    $http({
	        method : "GET",
	        url : "data/sentiment.php?candidate=2"
	    }).then(function(response){
	    	var result = response.data;
	    	for(var resp in result){
	    		var a = JSON.parse(result[resp]);
	    		if(a!=false){
	    			a.color=getRandomColor();
		    		a.data[0] = Number(a.data[0]);
		    		a.data[1] = Number(a.data[1]);
		    		var arr = [];
		    		arr.push(a.data);
		    		a.data = arr;
		    		tempB.push(a);
	    		}
	    	}
	    });
	}

	this.loadHillary = function(){
		this.option.series = tempB;
		Highcharts.chart('graph', this.option);
	}

	this.loadTrump = function(){
		this.option.series = tempA;
		Highcharts.chart('graph', this.option);
	}

	Highcharts.chart('graph', this.option);
});