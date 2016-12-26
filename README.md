# Demo NodeJS project

Developed for the purpose of a job interview, a relatively simple task:

* A user can create a profile
* A user can log in with an existing profile
* A user may view their profile, but only as long as they are logged in
* A user may log out
* Backend should use NodeJS to implement an API interface and should implement REST practices
* There is no need to use an actual database

## Backend

### Main framework choice

While I could have simply written the app in plain nodejs with the default http module, it's a waste of time to reinvent the wheel for any real project of a meaningful size, so I decided to search for a backend framework. I had some minor experience with express, but not enough to warrant it being an automatic choice. After doing some minor research, I narrowed it down to some of the more popular node frameworks - Express, Hapi, Koa and Loopback. Delving a bit deeper into the comparions readily available on the web, I came to these conclusions:

**Express** is pretty well known and one of the first frameworks most node developers encounter. It is also only a step up from the default node http module in that it requires a lot of manual coding to get everything done. That leads to code bloat as the project size grows - you either need to reinvent the wheel or depend on third party packages, which reduces the stability of your system. For that reason alone, I would prefer Hapi on larger projects.

**Loopback** js is a highly opinionated framework specificaly built for API requests. While I can see the appeal of the magic methods for smaller projects, I do not like them, especially for larger, complex projects. Mainly because sooner or later you start hammering your application to follow the logic required by the magic methods and it often leads to decreased performance or weird approaches / hacks to produce the desired results.

**Koa** is the the most commonly suggested framework when people ask "What's a good replacement for Express". While it is very popular, I saw some concerns regarding stability as it is pretty much the bleeding edge of node development, which would make me wary to use it in a business production environment.

I found **Hapi** to have a small but healthy community, positive feedback from developers and a lot of features (input validation, memory guards, security header checking etc). On the other hand, all that utility it provides comes with a hefty price: [poor performance](https://raygun.com/blog/2016/06/node-performance/). Obviously, the test is not completely objective, as in a real world scenario, you will probably need to implmenet some (if not most) of those things anyway, so the other processes would slow down as well. Also, it was developed by Walmart for their shop and is used by many enterprises, so it seems the performance is more than good enough when it comes to actual implementation. As such, I decided on Hapi as my framework of choice.

### Serving static content

Usually, I would set up Nginx to handle static file serving (the frontend files), but as the task did not involve it, I used the [inert](https://github.com/hapijs/inert) package to handle static files. I am siply serving the whole frontend package from the base url (*localhost:8000* returns *index.html*).

### Database & Authentication

As the task stated DB implementation is not necessary, I implemented it as a simple js object and simulated how a DB query would be executed in JS. I also allowed myself the luxury of avoiding user IDs and just using the username as the unique identifier.

The next step required me to choose the method of authentication. As JWT have become the commonly used approach, I decided to try my hand at implementing them. Besides not needing any server-side storage, they are stateless which is a requirement for a proper REST approach.
I also implemented a token "blacklist", which stores all invalidated tokens to prevent continued authentication once a user logs out.

### Misc

I did some light data validation with [Joi](https://github.com/hapijs/joi), which was chosen simply due to being the most popular choice in the hapi community.
A default user is prepared in the db by default with the username *randomjohn* and password *test211*.

Various improvements could have been made:
* various sensitive configuration information (such as the token private key, DB connection details...) are included in the base project instead of a separate file. This is a high security risk for a commercial application, but the safety was ignored for this demo. Oridnarily, I would include those settings in a separate json file or server setup script, which is then not included in the code repository.
* Tests - simply put, I ran out of time to write automated tests for the code

## Frontend

### Vue.js

My only relevant work experience comes from jQuery (and PHP), so I am working on the outskirts of modern frameworks when it comes to front end development. I have tried learning Angular 2, but found learning Typescript AND Angular at the same time a bit too challenging (plus, at the time Angular 2 was not officially released yet). I dipped my toes into react, but did not feel at home with the JSX syntax and the "html in JS" approach. I can see the uses, but I preferred it the other way around, so I decided to learn Vue, which looked very promising. I've been working on a separate project with it since, but am still learning. With that in mind, I decided to use Vue here as well.

### Shortcuts

Due to various time constraints, I was forced to cut corners a bit:

* I used [vuepack](https://github.com/egoist/vuepack) to generate the basic template for the website
* Design time was nonexistant, so the whole site looks very basic. Bootstrap 3 was used for CSS, with some vue-component modifications. A proper solution would have involved a SASS stylesheet with properly defined common classes, but I was having issues getting it to work with the webpack hotload and compiler, so I let it be.
* The JWT is stored as a cookie, but used in the header of requests. A token refresh method was not implemented (I started writing a simple method to request a new token and invalidate an old one, but found it insecure and ran out of time to implement a proper solution)
* As mentioned earlier, I am simply serving all the frontend as static files. Because of that, the vue router uses *#* to differentiate between routes. On a production server, I would have configured nginx to serve the same index.html regardless of the path and used the HTML5 history mode for navigation (cleaner URLs and better experience for most users).
* The birthdate is formatted using `toLocaleDateString`, I was considering implementing a more advanced solution, but that should really be used depending on the app requirements, so I did not change it