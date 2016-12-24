# Demo NodeJS project

Developed for the purpose of a job interview, a relatively simple task: Create an authentication API service in node that allows a user to register, log in and view their profile. A DB implementation is not required, so it is implemented through a simple DB interface mockup.
The task also asked for details on the choices made when building the app. Those decisions will be described in this readme.

## Backend

### Main framework choice

While I could have simply written the app in plain nodejs with the default http module, it's a waste of time to reinvent the wheel for any real project of a meaningful size, so I decided to search for a backend framework. I had some minor experience with express, but not enough to warrant it being an automatic choice. After doing some minor research, I narrowed it down to some of the more popular node frameworks - Express, Hapi, Koa and Loopback. Delving a bit deeper into the comparions readily available on the web, I came to these conclusions:

**Express** is pretty well known and one of the first frameworks most node developers encounter. It is also only a step up from the default node http module in that it requires a lot of manual coding to get everything done. That leads to code bloat as the project size grows - you either need to reinvent the wheel or depend on third party packages, which reduces the stability of your system. For that reason alone, I would prefer Hapi on larger projects.

**Loopback** js is a highly opinionated framework specificaly built for API requests. While I can see the appeal of the magic methods for smaller projects, I do not like them, especially for larger, complex projects. Mainly because sooner or later you start hammering your application to follow the logic required by the magic methods and it often leads to decreased performance or weird approaches / hacks to produce the desired results.

**Koa** is the the most commonly suggested framework when people ask "What's a good replacement for Express". While it is very popular, I saw some concerns regarding stability as it is pretty much the bleeding edge of node development, which would make me wary to use it in a business production environment.

I found **Hapi** to have a small but healthy community, positive feedback from developers and a lot of features (input validation, memory guards, security header checking etc). On the other hand, all that utility it provides comes with a hefty price: [poor performance](https://raygun.com/blog/2016/06/node-performance/). Obviously, the test is not completely objective, as in a real world scenario, you will probably need to implmenet some (if not most) of those things anyway, so the other processes would slow down as well. Also, it was developed by Walmart for their shop and is used by many enterprises, so it seems the performance is more than good enough when it comes to actual implementation. As such, I decided on Hapi as my framework of choice.

### Serving static content

Usually, I would set up Nginx to handle static file serving (the frontend files), but as the task did not involve it, I used the [inert](https://github.com/hapijs/inert) package to handle static files. I am siply serving the whole frontend package from the base url (*localhost:8080* returns *index.html*).