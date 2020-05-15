'use strict';
const faker = require('faker');
// CREATE AN ARRAY USING SPREAD SYNTAX, AND MAKE AN ARRAY WITH A SIZE OF 100
//100 UNIQUE PHRASES
const prompts =[...Array(100)].map(prompt => (

  //GOING TO MAP OVER OUR ARRAY AND EACH PROMPT WILL RETURN AN ARRAY
        //POPULATING FIELDS FOR OUR MODEL
  {
    title: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

//SEE SEED DATA
console.log("SEED DATAT",prompts);


module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Prompts', prompts);
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
