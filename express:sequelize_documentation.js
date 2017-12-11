/*
How to make a proper app backend
1) make the right requirements, import the correct libraries
2)configure a proper rendering engine for html so the browser can do something spiffy
3) include smart middlewhere
- body parsing middlewear to help handle incoming requests that contain important information
- error logging middlewear
- request logging middlewear
- static middlewear to handle requests for static files (like css, jpg, png...etc)
4) routing - make smart routes
- remember req.params , req.query and how those work
- get, put, post, delete
- keep things as dry as possible here and remember that
the server can only send one res per req
5) creating smart database models
- use hooks, getters, and setters to keep your code maintainable for future developers
and optimized for storage
- make sure your promise logic is CORRECT - no race conditions
- reading files is expensive and timely, limit your queries (by using things like router.params)
- make logical associations - one to one, one to many, many to many and remember how sequel
will create methods for you once you establish your associations
- use proper validations when possible
- CATCH YOUR ERRORS
- CHECK YOUR CONTEXTS - WHAT IS THIS??????
6) make sure your exporting the right stuff and not exporting unecessarily
7) save your requirements in your package.json (npm install --save) SAVE IT



~~~~~~~~~~~~~~~~~~~~~~KEEP IT LIGHT, KEEP IT SIMPLE~~~~~~~~~~~~~~~~~~~~~~
*/

// ~~~~~~~~~~~~~~~~~~~~~~~ BOILERPLATE MATERIAL ~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~MAIN FILE DOCUMENTATION~~~~~~~~~~~~~~~~~~~~~~~~~~~
//requirements for app.js (or root file)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path'); //for path.join()
const chalk = require('chalk');
module.exports = app; //probably not necessary when working with test specs

//how to configure an HTML rendering engine
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true }); //noCache should be set to true while testing, but false when in production

// const AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
// env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));
//^^^^????

//logging middleware - 2 options: (left out volleyball)
//morgan:
app.use(morgan('dev')); //look into why dev?
//self made
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//creating static middlewear to handle requests for static files:
//use path.join to make a more dynamic path argument - direct the static middlewear
// to the directory where the static files live
app.use(express.static(path.join(__dirname, './public')));

//using body parse to parse json and urlencoded put & post requests
//if we're using html forms, urlencoded will be the format of the incoming message
//remember where you PLACE your body parsing code, it needs to be before any routing
// so your routes can take the
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//direct our incoming requests to a router file:
app.use(require('./routes'));

//remember to include proper error handling middlewear
app.use((error, req, res, next) => {
    error.status = error.status || 500; //defaults error status to 500
    error.message = error.message || 'Internal Error';
    // res.render('error', {error}); --> should render something to avoid information leaks on the browser
});

// good to sync your database, and then include the port listening in promise
// to ensure that your db's are synced properly
// it's good to have a PORT variable because you can refer to your port
// in other parts of your program

models.db.sync()
.then(() => {
  app.listen(PORT, () => {
  console.log(chalk.blue('listening on port ' + PORT));
  });
});

//~~~~~~~~~~~~~~~~~~~~~~~~ ROUTING FILE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//routing file requirements
//HANDLE ERRORS --> DO NOT LET INFORMATION LEAK INTO THE BROWSER

const db = require('sequelize'); //might be better required in routing file
const fs = require('fs'); //for __dirname
const models = require('./models');
const router = express.Router();

//middlewear that runs everytime we refer to the param given as the first argument
//http://expressjs.com/en/api.html#router.param
router.param('param (like urltitle or user)', (req, res, next, paramValue) => {
  //callback function that can handle errors or something else that we want
  //to happen on every request for param
});

//standard get
router.get('param', (req, res, next) => {
  //callback function

  // if callback contains a promise chain, the catch should say:
  new Promise
  .then()
  .catch(next);
})

router.post('param', (req, res, next) => {
  // for creating new resources
  let requestOfContent = req.body; //an object from body parser
  // do stuff
})

router.delete('param', (req, res, next) => {
  //delete a resource
})

// ------- dynamic routing -----------
router.get('paramName/:extension', (req, res, next) => {
  let uriExtension = req.param.extension // this stores the value of the
})

//-----------querying-------------
//if we wanted to get some information about whether users were online
//uri would be --> paramName?users=online
router.get('paramName', (req, res, next) => {
  req.query.users === 'online' // this means the uri was paramName?users=online
  // if !req.query.users === true, no query is in the uri - use this check condition
})

//-----------creating errors-----------------
router.get('/errorTest', (req, res, next) => {
    //forces an error to be passed through
    //to the global error handler at the bottom
      let err = new Error('custom error message here');
      err.status = 404;
      next(err);
    // }
  });

  //---------res methods ---------
  // res.send
  // res.json
  // res.render
  //res.status(statusNum)

  // --------req methods ---------
  // req.query.[param]
  // req.body
  // req.params.[param]




//~~~~~~~~~~~~~~ MODELS (name your file index.js) ~~~~~~~~~~~~~~~~~~~~~~~
// https://github.com/tmkelly28/sequelize-reference
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/<DBNAME>', {
  logging: false
});


const SchemaOne = db.define('schemaOne', {
  rowOne: {type: Sequelize.STRING, allowNull: false},
  rowTwo: {type: Sequelize.STRING, allowNull: false}
  //etc...
}, {
  getterMethods: {
    //function name: function() {}....,
    //function name: function() {}....
  },
  setterMethods: {
    //function name: function() {}....,
    //function name: function() {}....
  },
  hooks: {
    //(before, after, etc)
    //function name: function() {}....,
    //function name: function() {}....
  }
});

const SchemaTwo = db.define('schemaTwo', {
  rowOne: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ,//something
    validate: {
     // something here
    }
  },
  rowTwo: {type: Sequelize.STRING, allowNull: false}
  //etc...
}, {
  getterMethods: {
    //see schemaOne
  },
  setterMethods: {
    //see schemaOne
  },
  hooks: {
    //see schemaOne
  }
});

//!!!!!!!!
//REMEMBER this.getDataValue('column')
//this.setDataValue('column', value)


//Class Method Example:
schemaOne.deleteAll = function() {
  //returns a promise
  return schemaOne.destroy({where: {}});
};

//Instance Method Example:
schemaOne.prototype.changeAllRowTwo = function() {
  //returns an array of promises, sets all rowTwo vals to 'updated'
  return schemaOne.update({rowTwo: 'updated'}, {where: {/*blank, thus all*/}});
};

// //Associations. These are commented out as they conflict.

// //one to one associations:
// schemaTwo.hasOne(schemaOne, {as: 'association2'});

// //one to many associations:
// schemaOne.hasMany(schemaTwo, {as: 'OneToMany'});

// //one to one OR one to many:
// schemaOne.belongsTo(schemaTwo, {as: 'association1'});

// //many to many:
// schemaOne.belongsToMany(schemaTwo, {as: 'manyToMany'});

//exports:
module.exports = {db, schemaOne, schemaTwo};

Entity.findAll({where: {
  id: {},
  attribute2: {

  }
}})

//Eager Loading
Model.findAll(
  {where: { id: something.id},
    include: [{ all: true }]
  })

  //or to find one foreign key
Model.findAll({include: [something]})

  //requires foreign keys
  Model1.belongsTo(Model2, {foreignKeyConstraint: true});
  Model2.hasMany(Model1);


  var Model = db.define('Model', {
    title: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: false}},
    content: {type: Sequelize.TEXT, allowNull: false},
    snippet: {type: Sequelize.VIRTUAL,
      get () {
        if (this.getDataValue('dataVal')) {
          return this.getDataValue('dataVal').slice(0, 23) + '...';
        } else {
          return '';
        }
      }
    },
    version: {type: Sequelize.INTEGER, defaultValue: 0},
    tags: {type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: [],
      get () {
        return this.getDataValue('tags').join(', ');
      }
    }
  });

  Model.prototype.truncate = function(length){
    this.content = this.content.slice(0, length);
  };

  Model.findByTitle = function(title){
    return Article.findOne({where: { title: title }});
  };

  Model.beforeUpdate((ModelInstance) => ModelInstance.version++ );

  Model.belongsTo(OtherModel, {as: 'something'});
