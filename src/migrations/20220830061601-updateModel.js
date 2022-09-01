'use strict';

module.exports = {
  async up (query, Sequelize) {

        return Promise.all([
          query.changeColumn('calenders', 'startDate', {
            type: Sequelize.DATEONLY,
            allowNull: false,
          }),
          query.changeColumn('calenders', 'endDate', {
            type: Sequelize.DATEONLY,
            allowNull: false,
          }),

        ]);
      },
    
      down: (query) => {
        return Promise.all([query.changeColumn('calenders', 'startDate','endDate',)]);
      },
    };


























    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   }
// };
