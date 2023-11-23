# Secure Coding Practices
Secure coding is the practice of developing computer software in such a way that guards against the accidental introduction of security vulnerabilities. 

Defects, bugs and logic flaws are consistently the primary cause of commonly exploited software vulnerabilities. Through the analysis of thousands of reported vulnerabilities, security professionals have discovered that most vulnerabilities stem from a relatively small number of common software programming errors. 

By identifying the insecure coding practices that lead to these errors and educating developers on secure alternatives, organizations can take proactive steps to help significantly reduce or eliminate vulnerabilities in software before deployment.

# Defensive Programming
Defensive programming is a form of defensive design intended to develop programs that are capable of detecting potential security abnormalities and make predetermined responses. 

It ensures the continuing function of a piece of software under unforeseen circumstances. Defensive programming practices are often used where high availability, safety, or security is needed.

Defensive programming is an approach to improve software and source code, in terms of:
  - General quality and reducing the number of software bugs and problems.
  - Making the source code comprehensible and source code should be readable and understandable so it is approved in a code audit.
  - Making the software behave in a predictable manner despite unexpected inputs or user actions.

## Defensive Programming Techniques
1. **Intelligent Source Code Reuse:**
    
    If existing code is tested and known to work, reusing it may reduce the chance of bugs being introduced.
     
     However, reusing code is not always good practice. Reuse of existing code, especially when widely distributed, can allow for exploits to be created that target a wider audience than would otherwise be possible and brings with it all the security and vulnerabilities of the reused code.
     
     When considering using existing source code, a quick review of the modules(sub-sections such as classes or functions) will help eliminate or make the developer aware of any potential vulnerabilities and ensure it is suitable to use in the project.

2. **Legacy Problems:**
   
   Before reusing old source code, libraries, APIs, configurations and so forth, it must be considered if the old work is valid for reuse, or if it is likely to be prone to legacy problems.
   
   Legacy problems are problems inherent when old designs are expected to work with today's requirements, especially when the old designs were not developed or tested with those requirements in mind.
   
   Many software products have experienced problems with old legacy source code; for example:
      - Legacy code may not have been designed under a defensive programming initiative, and might therefore be of much lower quality than newly designed source code.
      - Legacy code may have been written and tested under conditions which no longer apply. The old quality assurance tests may have no validity any more.
        - **Example 1:** legacy code may have been designed for ASCII input but now the input is UTF-8.
        - **Example 2:** legacy code may have been compiled and tested on 32-bit architectures, but when compiled on 64-bit architectures, new arithmetic problems may occur (e.g., invalid signedness tests, invalid type casts, etc.).
        - **Example 3:** legacy code may have been targeted for offline machines, but becomes vulnerable once network connectivity is added.
      - Legacy code is not written with new problems in mind. For example, source code written in 1990 is likely to be prone to many code injection vulnerabilities, because most such problems were not widely understood at that time.
3. **Canonicalization:**
    
    Malicious users are likely to invent new kinds of representations of incorrect data. For example, if a program attempts to reject accessing the file `/etc/passwd`, a hacker might pass another variant of this file name, like `/etc/./passwd`. Canonicalization libraries can be employed to avoid bugs due to non-canonical input.
4. **Low Tolerance Against "Potential" Bugs:**
   
   Assume that code constructs that appear to be problem prone (similar to known vulnerabilities, etc.) are bugs and potential security flaws. The basic rule of thumb is: "I'm not aware of all types of security exploits. I must protect against those I do know of and then I must be proactive!".

For more check this out: [CERT Secure Coding Standards](https://www.securecoding.cert.org/confluence/display/seccode/SEI+CERT+Coding+Standards)

# When it comes to Application security aka AppSec
Includes all tasks that introduce a secure software development life cycle to development teams. Its final goal is to improve security practices and, through that, to find, fix and preferably prevent security issues within applications. It encompasses the whole application life cycle from requirements analysis, design, implementation, verification as well as maintenance

## Approaches
Different approaches will find different subsets of the security vulnerabilities lurking in an application and are most effective at different times in the software lifecycle. They each represent different tradeoffs of time, effort, cost and vulnerabilities found.

- **Design review.** Before code is written the application's architecture and design can be reviewed for security problems. A common technique in this phase is the creation of a threat model.
- **Whitebox security review, or code review.** This is a security engineer deeply understanding the application through manually reviewing the source code and noticing security flaws. Through comprehension of the application, vulnerabilities unique to the application can be found.
- **Blackbox security audit.** This is only through the use of an application testing it for security vulnerabilities, no source code is required.
- **Automated Tooling.** Many security tools can be automated through inclusion into the development or testing environment. Examples of those are automated DAST/SAST tools that are integrated into code editor or CI/CD platforms.
- **Coordinated vulnerability platforms.** These are hacker-powered application security solutions offered by many websites and software developers by which individuals can receive recognition and compensation for reporting bugs.
  
## In Web Apps
### Use TLS
How often have you been surfing the web these days and not seen that green lock in the URL bar? I bet you it's not often and when it happened it was on a very static website.

These days it's an absolute no-go to use HTTP, FTP, ... when we have secure options easily available. For example:

https://letsencrypt.org/

This is a very easy-to-use website that can easily help you put that secure lock on your website. The best part? It's free!

The same goes for FTP of course, we can keep using FTP but there should be a good reason when SFTP exists if it pertains to sensitive data.

### Cookies

These days we have several flags that we can set on cookies which we should use if we can.
- HttpOnly: This cookie can not be read or set by the javascript code. This can protect an application against XSS attacks but only by not allowing the attacker to not steal that specific cookie. Remember to enable this on ALL sensitive cookies.
- Session: This cookie is only valid for the current session and will be destroyed afterwards. Useful if you want cookies to be sensitive to the session context and nothing else. (i.e. when the user is logged in)
- Secure: If this flag is set, the cookie will never be sent in any requests that is not TLS-based. (HTTPS)
- HostOnly: This flag makes it impossible for cookies to be read from other domains INCLUDING other subdomains. Cookie "a" will be available on hackxpert.com but not mail.hackxpert.com

### Test Every Single Piece of User Input

It may seem obvious at first but everything the users can control needs to be rigorously tested. We can not trust it to any degree and especially if your application is public facing. You'd be surprised how hackers can find an entry point. I filtered every single piece of input from my application one time ... yet they found a way because the id of my object was also reflected in the page in a hidden input field and they managed to abuse the one thing I never expected users to control.

This means:
- Hidden inputs
- File names
- File contents
- Parameters that are live but not used
- Headers

And even if you think you are safe, you are not. Just take a look at

### Don't Allow Flooding

This means that should not allow the user to enter more data than they should be required to. An example would be a description where it would not be wise to let the user enter infinite data as it could quickly kill a complete db. Some more obvious items come to mind as well such as phone numbers, email addresses and addresses.

### Use Encryption

You really don't want to be known as the company that saved the clients' passwords in plain text but also when sending data between services or APIs, we should encrypt all sensitive data to prevent a MiTM attack from causing serious harm.

Besides this, you need to encrypt any data you store that seems to be sensitive or at least put layered security on the database but more about that in the next chapter.

### Use Multi-Layer Security

I know this seems like a drag and giving every new employee who has only been at the company for a few days admin access instead of arranging them a proper account. It is vital however that we layer our security well.

## Use Well-Known Libraries, Especially For Things Like Encryption

It's not a good idea to write custom code for existing solutions such as plug-ins and libraries. When talking about important security functions such as authentication, authorization, and data related, we should make sure that we don't use our own code to protect it but use a well-known, well-tested library that has proven to stand the test of time.

## Use delays And Rate-Limiting

Attackers often rely on techniques that require them to fire off multiple requests per second but some decent rate-limiting to a few requests per second and even temporary banning IP addresses when they spam the system is not a bad idea.

The last option we have is to add a captcha which usually does not affect normal users much these days but since Google acquired it, it seems to pop up often for bots. I think we all know the "Select the images with a blue zebra" captcha's but as you may know, you do not see them often anymore so this is not a great deterrent for consumers.

While this might prove effective, you need to be sure you don't hinder users who want to use your application at a decently rapid rate but the more you can delay bots the better.

A good approach of this could be "gradual back-off" where you double the waiting time before a new request can be sent after sending a bad request such as a bad login attempt.

## Build Security Walls

As much as the average user hates retyping their password, it can provide effective protection against attackers who are able to compromise an account as they will be limited at every turn that requires them to enter a password. You don't want to annoy the consumer either but the following would be recommended to at least contain a location to re-enter the user's password:
- On a buy action
- On a change password action
- On a change email action
- When access data can be seen as sensitive such as viewing credit card data

## APIs

It's important to talk about splitting up your code into logical APIs because if you do, it will be a lot easier to audit interactions between your internal APIs. You know that auditing internal traffic within source code is never easy but if we expose this through APIs, we are much more likely to produce safe, auditable, and reusable code.

## Peer Reviews

Peer reviews are an important part of good code practices and while most people think any other developer can perform code audits, I think it's vital that at least one person with a lot of experience in the security field also looks at the code in a critical way before it gets pushed to the production pipelines.

It might even be beneficial to bring in an outside auditor who will take an objective look at the code and the architecture and bring in their expertise. Possibly even on a regular basis.

## Use Well-Known Code Analyzers

Code analyzers can easily find bugs humans miss and they are a vital addition to your toolset. Tools such as SonarQube or findBugs can bring out hidden exploits that are easy to miss by humans. They might require some initial setup but they are well worth the hassle.

## The Path Of Least Privilege

Every function, every user input, every single process should only be given as many privileges as are required to function properly. If you give certain users or processes more rights, you might open yourself up to attacks so it might take a little bit more trouble to implements all these security measures and make sure your application still works, an actual attack would cost multiple times the amount you'd have to spend on dev and QA time.

## Limit Your Error Message Details

You really don't want to give the attackers any information so debug, log, info and error messages should all be disabled and kept to internal logging. Even something as simple as a SQL database name could be enough an attacker needs to complete their SQLi attack.

## Default Credentials

Never leave any credentials default, always disable default account and make sure admin pages don't have lazy passwords/usernames such as test/test or admin/admin

This should speak for itself but it hurts me to see how often this is forgotten and a test account gets pushed to production when copying over the authentication module so please don't make these mistakes.

## Updates

Keep every piece of software, library and plug-in up to date. This sounds easier than it is because if your application grows, the libraries and the plug-ins being used might get out of hand or you might lose an overview. This is why you need to work diligently to keep things updated because usually these updates contain security updates as well and you don't want to miss those

## Don't Keep Passwords In Files

If you upload these files to a repo that is public, the passwords will also be public and even though you might remove the file, the commit history also still exists. It's much better to keep sensitive passwords in environment variables. This way you can transfer those passwords to your CI/CD solution and make sure attackers never see the actual values.

## Use Both Client And Server-Side Filtering/Validation

It's important to know that client-side validation might form a small barrier to attackers, in this day and age, they will not even care. With MiTM proxies and abilities to disable these client-side validations, we have to make sure to also implement server-side validations.
