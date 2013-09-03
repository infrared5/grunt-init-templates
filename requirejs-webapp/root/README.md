{%= name %}
---
> {%= description %}

Requirements
---
Development environment is setup to use [grunt](http://gruntjs.com/). This allows for defining tasks (through its plugin system) that aide in development of JavaScript projects such as linting, unit testing and - most importantly - deploying the optimized client for production.

As such, [node](http://nodejs.org), [npm](https://npmjs.org/) and [grunt](http://gruntjs.com/) (>=0.4.0) are required to properly deploy the application. If any of these are not available on your machine, please perform the following:

###Download and install node
[http://nodejs.org/download/](http://nodejs.org/download/)

###Install npm
[npm](https://npmjs.org/) is a node package manager.
```
$> curl http://npmjs.org/install.sh | sh
```
###Install grunt CLI globally
[grunt](http://gruntjs.com/) is a build tool that makes running specific tasks easy.
```
$> npm install -g grunt-cli
```

###Install bower globally
[bower](https://github.com/twitter/bower) is a client-side library manager. Libraries are stored in this top-level directory in a _/components_ directory.
```
$> npm install -g bower
```

###Download and install PhantomJS
[PhantomJS](http://phantomjs.org/) is a headless WebKit and allows for DOM traversal and navigation. It is used to run tests headlessly.

To download and install __PhantomJS__:
* Navigate to the [download](http://phantomjs.org/download.html)
* Expand the download somewhere on your system where you will likely keep software (for the purposes of this example, we'll say _/User/ir5/software/phantomjs_)
* Create a symlink for phantomjs to your _/usr/local/bin_ directory so that it is invokable from the command line:
  
  sudo ln -s /User/ir5/software/phantomjs/bin/phantomjs /usr/local/bin/phantomjs

Once the proper dependencies are installed:
---
### npm
Point your command terminal to the _/javascript_ project directory and run the following command:
```
$> npm install
```
This command will read the _package.json_ file and install needed node module dependencies for the project.

### bower
If a _component.js_ or _bower.js_ file is available in the top-level _/javascript_ directory, also run the following command:
```
$> bower install
```
This command will read the _component.js/bower.js_ file and download associated library files from github.

If you want to add another javascript library dependency to the project please use the following command so the _component.js/bower.js_ file will be maintained properly:
```
$> bower install <lib> --save-dev
```

Tasks
---
The following tasks are available for use in developing, testing and deployment:

### default
The default grunt task is the run the linter, [Jasmine](http://pivotal.github.io/jasmine/) tests and build the optimized webapp.
```
$> grunt
```

### jshint
Will run linting on all defined sources
```
$> grunt jshint
```

### test
Will run the [Jasmine](http://pivotal.github.io/jasmine/) specrunner found under _test/jasmine_ headlessly with response on the cli.
```
$> grunt test
```

### casper
Will run the [CasperJS](http://casperjs.org/) tests found under _test/casper_ headlessly with response on the cli.
```
$> grunt casper
```

### server
Will launch the webapp under localhost with un-optimized target.
```
$> grunt server
```

### server:test
Will launch the [Jasmine](http://pivotal.github.io/jasmine/) specrunner client in a browser under localhost in order to debug tests.
```
$> grunt server:test
```

### server:dist
Will launch the built and optimized weball under localhost in order to debug before deployment.
```
$> grunt server:dist
```

### build
Will build and optimize the project and deploy to a distribution directory (_/dist_).
```
$> grunt build
```