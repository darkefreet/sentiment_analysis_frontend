<!DOCTYPE html>
<html ng-app="myModule">
<head>
	<title>Sentiment Analysis</title>
    <script src="javascript/angular.js"></script>
    <script src="javascript/jquery.js"></script>
    <script src="javascript/highchart.js"></script>
    <script src="javascript/controller.js"></script>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/main.css"/>
</head>	
<body ng-controller="myController as controller" class="container" style="padding-top:30px;">
    <div class="col-xs-3 menu">
    	<div class="menuItem">
	    	<div class="col-xs-12 pad" ng-repeat="item in controller.attributes">
	    		<label class="col-xs-8">{{item.name}}</label>
	    		<input type="checkbox" class="col-xs-4" ng-change="controller.toggle(item)" ng-model="item.toggle">
	    	</div>
    	</div>
    </div>
    <div class="col-xs-9 jumbotron" id="graph" ng-init="controller.init()"></div>
</body>
</html>
