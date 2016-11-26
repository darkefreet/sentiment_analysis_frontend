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
	this.color = ['#ff6c0a','#0aff12','#f6ff0a','#ffaa00','#ffdd88','#000000','#abfc88','#1fc445','#10e5b0','#126e7a','#a504e0','#e0044a'];
	this.colorIndex = 0;

	var attributes = [{
		id : 0,
		name : "Trump's Negative",
		data : [],
		toggle : false
	},{
		id : 1,
		name : "Trump's Neutral",
		data : [],
		toggle : false
	},{
		id : 2,
		name : "Trump's Positive",
		data : [],
		toggle : false
	},{
		id : 3,
		name : "Hillary's Negative",
		data : [],
		toggle : false
	},{
		id : 4,
		name : "Hillary's Neutral",
		data : [],
		toggle : false
	},{
		id : 5,
		name : "Hillary's Positive",
		data : [],
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
            valueSuffix: 'tweets'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
	}
	this.option.series = [];

	this.init = function(){
		this.attributes = attributes;
		for(var i =0; i<attributes.length;i++){
			// attributes[i].color=this.color[this.colorIndex];
			// this.colorIndex = (this.colorIndex + 1) % this.color.length;
			attributes[i].color = getRandomColor();
		}
		$http({
	        method : "GET",
	        url : "data/sentiment.php"
	    }).then(function mySucces(response) {
	        this.response = response.data;
	        console.log(response.data);
	        var date = 11;
	        for(var i = 0; i<8;i++){
	        	date++;
	        	var fullDate = "2016-11-" + date;
	        	for(var resp in this.response){
	        		if(fullDate==this.response[resp].date){
	        			var id = Number(this.response[resp].attribute_id)+1;
	        			id = id*3 + Number(this.response[resp].sentiment) + 1;
	        			for(var element in attributes){
	        				if(attributes[element].id === id){
	        					attributes[element].data.push(Number(this.response[resp].total));
	        				}
	        			}
	        		}
	        	}	
	        }
	        copyAttributes();
	    });	
	}

	var copyAttributes = function(){
		this.attributes = attributes;
		
	}

	this.add = function(item){
		this.option.series.push(item);
		Highcharts.chart('graph', this.option);
	}

	this.del = function(item){
		for(var i = 0;i<this.option.series.length;i++){
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