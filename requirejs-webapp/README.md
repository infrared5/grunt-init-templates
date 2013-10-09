Introduction
---
> requirejs-webapp is a grunt-init template for scaffolding web-based projects that utilize [RequireJS](http://requirejs.org), [Handlebars](handlebarsjs.com) and [jQuery](http://jquery.com).

Usage
---
Read the main [README](https://github.com/infrared5/grunt-init-templates/blob/master/README.md) on install requirements and operation of [grunt-init](http://gruntjs.com/project-scaffolding) templates.

```
$> mkdir myapp && cd myapp
$> grunt-init requirejs-webapp
```

Scaffold
---
Once a project is generated, you will need to run the following commands in order to pull in the proper dependencies for developing, testing and deploying the project:

```
$> npm install
$> bower install
```

Tasks
---
In addition to being able to develop and deploy a webapp that utilizes [RequireJS](http://requirejs.org), [Handlebars](handlebarsjs.com) and [jQuery](http://jquery.com), the project will be scaffolding to integrate unit-testing with [Jasmine](http://pivotal.github.io/jasmine/) (BDD-syntax lib for logical/functional tests) and [CasperJS](http://casperjs.org/) (lib for integration/UI tests).
