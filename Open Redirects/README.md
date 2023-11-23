# Open Redirect In Nutshell
An open redirect is a type of computer security vulnerability found in web applications. It can be exploited if it parses user input for making an URL redirection decision, which is then not properly validated.

## Navigate to this file: `buggy_PHP.php`

```php
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
```
Since you know what an open redirect is, can you guess what the problem here is? As you might have been able to guess, the problem occurs because we are easily redirected to any website, no matter which one.

## Navigate to this file: `secure_PHP.php` Let's secure it!
One solution could be to only allow the user to enter a part of the URL such as the directory while we control the rest.

Remember, The best solution is to not allow the user to control any part of the redirect if you can avoid it.

```php
<?php

if(isset($_GET['url'])){
    if(strstr($_GET['url'],$_SERVER['HTTP_HOST'])){
        $redirect_url = $_GET['url'];
        header("Location: https://" . $redirect_url);
    }else{
        echo "You can only direct to " . $_SERVER["HTTP_HOST"];
    }
}
?>

<form method="GET">
    URL:<input type="text" id="url" name="url"><br>
    <input type="submit">
</form>
```

## Tips
As you might see, it's very hard to properly protect against open redirects. Even if we think we only allow the users to surf to our website, a crafty hacker might still find a way around it. This is why these general tips should help you:
- Do not allow external user input
- If you have to use redirects with user input, make sure you only allow them to enter a small part of the URL and never the full URL
- Even though the user may only enter a part of the URL, still validate it like you would with anything. NEVER trust user input.
- If you use a filter, use a whitelist filter and not a blacklist-based one. This gives you much more control over where the user can be sent.
- Another excellent way of remedying Open Redirect vulnerability is by utilizing NeuraLegion Nexploit a black-box security testing solution that examines your application, APIs, or WebSockets to find vulnerabilities.
- Make sure you test ALL URLs where redirection is present. Some might be hidden deep within the application.
  
## Cc - The XSS Rat, Wiki