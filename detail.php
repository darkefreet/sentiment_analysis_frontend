<!DOCTYPE html>
<html ng-app="myModule">
<head>
	<title>Detail Sentiment Analysis</title>
    <script src="javascript/angular.js"></script>
    <script src="javascript/jquery.js"></script>
    <script src="javascript/highchart.js"></script>
    <script src="javascript/controller-detail.js"></script>
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/main.css"/>
</head>	
<body ng-controller="myController as controller" class="container" style="padding-top:30px;">
    <div class="col-xs-3 menu">
    	<div class="menuItem">
            <button class="btn btn-danger pad" ng-click="controller.loadTrump()">
                Load Trump
            </button>
            <button class="btn btn-primary pad" ng-click="controller.loadHillary()">
                Load Hillary
            </button>
<!-- 	    	<div class="col-xs-12 pad" ng-repeat="item in controller.attributes">
	    		
	    	</div> -->
    	</div>
    </div>
    <div class="col-xs-9 jumbotron" id="graph" ng-init="controller.init()"></div>
</body>
</html>
