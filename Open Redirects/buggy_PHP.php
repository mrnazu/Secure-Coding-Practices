<?php

if(isset($_GET['url'])){
    $redirect_url = $_GET['url'];
    header("Location: " . $redirect_url);
}
?>

<form method="GET">
  URL:<input type="text" id="url" name="url" /><br />
  <input type="submit" />  
</form>

