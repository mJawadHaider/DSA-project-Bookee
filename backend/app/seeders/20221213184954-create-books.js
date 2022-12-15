'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "books",
      [
        {
          name: "Harry Potter",
          author: "J.K Rowling",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The prisoner of Azhkaban",
          author: "J.K Rownling",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "books",
      [
        {
          first_name: "Harry Potter",
          author: "J.K Rowling",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The prisoner of Azhkaban",
          author: "J.K Rownling",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  }
};
