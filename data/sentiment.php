<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(isset($_GET['candidate'])){
            getDetail($_GET['candidate']);
        }else{
            getData();
        }
    }
    class Emp {
      public $candidate_id = "";
      public $name  = "";
      public $data = "";
    }

    function getDetail($number){

        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "sentiment";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql="select attribute_name,candidate_id, sum(sentiment) as percent, count(*) as total from attributes where candidate_id=".$number." group by attribute_name,candidate_id order by total desc limit 15;";
        $result=$conn->query($sql);
        $newArray = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $e = new Emp();
                $e->name= $row["attribute_name"];
                $e->candidate_id= $row["candidate_id"];
                $e->data = array(2);
                $e->data[0] =  $row["total"];
                $e->data[1] =  $row["percent"];
                array_push($newArray,json_encode($e));
            }
            echo json_encode($newArray);
        } else {
            echo "0 results";
        }
        $conn->close();
    }

    function getData(){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "sentiment";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "select attribute_id,count(*) as total,sum(percentage) as sum_percentage,sum(sentiment) as sum_sentiment,sentiment,date from graphs group by attribute_id,date,sentiment;";
        $result=$conn->query($sql);
        $myArray = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
        } else {
            echo "0 results";
        }
        $conn->close();
    }
?>