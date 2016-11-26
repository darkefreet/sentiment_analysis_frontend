<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        getData();
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