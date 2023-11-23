<?php

if(isset($_GET['url'])){
    if(strstr($_GET['url'],$_SERVER['HTTP_HOST'])){
        $redirect_url = $_GET['url'];
        header("Location: https://" . $redirect_url);
    }else{
        echo "You can only redirect to " . $_SERVER["HTTP_HOST"];
    }
}
?>

<form method="GET">
    URL:<input type="text" id="url" name="url"><br>
    <input type="submit">
</form>