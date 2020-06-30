"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "scoreLists",
      [
        {
          score: 111111,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 5,
        },
        {
          score: 111112,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 5,
        },
        {
          score: 222222,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          score: 333333,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          score: 444444,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          score: 555555,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4,
        },
        {
          score: 666666,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("scoreLists", null, {});
  },
};
