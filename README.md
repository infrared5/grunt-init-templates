Introduction
---
> Within this repository are various [grunt-init](http://gruntjs.com/project-scaffolding) templates that aide in scaffolding common client-side projects.

Requirements
---
[grunt-init](http://gruntjs.com/project-scaffolding) is a node-based tool used in scaffolding client-side projects.

As such, along with [grunt-init](http://gruntjs.com/project-scaffolding), [node](http://nodejs.org) and [npm](https://npmjs.org/) are required use these project templates and scaffold common client-side projects. If any of these are not available on your machine, please perform the following:

###Download and install node
[http://nodejs.org/download/](http://nodejs.org/download/)

###Install npm
[npm](https://npmjs.org/) is a node package manager.
```
$> curl http://npmjs.org/install.sh | sh
```

###Install grunt-init
```
$> npm install -g grunt-init
```

_Each project template directory should contain their own README file which will define any additional requirements for the defined project._

Usage
---
To scaffold a project using a [grunt-init](http://gruntjs.com/project-scaffolding) template, you run either of two commands.

The following command will look within __~/.grunt-init__ for the *{%= template-name %}*:

  $> grunt-init {%= template-name %}

You can also define the template as a path:

  $> grunt-init /Users/ir5/grunt-init-templates/{%= template-name %}

###Clone & SymLink
I prefer to clone on my local disk and create symbolic links within __~/.grunt-init__ that point to template directories of this repository.

  $> git clone git@github.com:infrared5/grunt-init-templates.git ir5-grunt-init-templates

To create a symbolic link so [grunt-init](http://gruntjs.com/project-scaffolding) can find the template by name:

  $> ln -s ir5-grunt-init-templates/requirejs-webapp ~/.grunt-init/requirejs-webapp

Then, in order to scaffold a new project witht the *requirejs-webapp* template:

  $> mkdir myapp && cd myapp
  $> grunt-init requirejs-webapp
