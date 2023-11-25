# XSS In Nutshell
XSS is a type of security vulnerability that occurs when an attacker/hunter :) injects evil `js` into web maybe via userinput. These scripts are then executed in the context of the victim's browser, allowing the attacker to steal information, manipulate the appearance of a website, or perform other malicious actions.

XSS is caused by inadequate validation and sanitization of user input in web. When input from users is not properly filtered or sanitized before being displayed, an attacker can inject scripts that get executed by other users' browsers.

Attackers inject malicious code, typically `JavaScript`, into web applications through user inputs like i said above, such as `form fields`, `URL parameters`, or even `HTTP headers`. When the application doesn't properly validate or sanitize this input, the malicious code gets stored and later executed by other users' browsers.

Now navigate to: `Buggy_Node.js` script