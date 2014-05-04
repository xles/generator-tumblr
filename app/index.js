'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var TumblrGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Tumblr generator.'));

    var prompts = [
      {
        type: 'input',
        name: 'themeName',
        message: 'What is the name of this theme?',
        default: 'Tumblr Theme'
      },
      {
        type: 'list',
        name: 'framework',
        choices: [
          {
            name: 'Twitter Bootstrap 3',
            value: 'bootstrap'
          },
          {
            name: 'Zurb Foundation 5',
            value: 'foundation'
          },
          {
            name: 'No CSS framework',
            value: 'none'
          }
        ],
        message: 'Would you like a CSS framework?'
      },
      {
        type: 'confirm',
        name: 'tumblrThemr',
        message: 'Would you like to use the TumblrThemr testing framework?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.themeName = props.themeName;
      this.framework = props.framework;

      this.log(chalk.red(this.framework));

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/templates');

    this.template('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = TumblrGenerator;
