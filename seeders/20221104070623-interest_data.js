'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('interests', [
      {
        // ["Shows", "Music","Movies", "Books", "Games"]
        interest_title: 'Games of thrones',
        interest_category: 'Shows'
        
      },
      {
        interest_title: 'Need for Speed',
        interest_category: 'Games'
      }
    ], {});

   
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('interests', null, {});
  }
};
