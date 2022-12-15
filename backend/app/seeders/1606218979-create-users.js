module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          first_name: "Danish",
          last_name: "Akram",
          email: "admin@gmail.com",
          role: "admin",
          password: "mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=", // password is `sajjad734`
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: "Jawad",
          last_name: "Haider",
          email: "reader@gmail.com",
          role: "reader",
          password: "mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=", // password is `sajjad734`
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) =>
    queryInterface.bulkDelete(
      "users",
      [
        {
          first_name: "Danish",
          last_name: "Akram",
          email: "admin@gmail.com",
          role: "admin",
          password: "mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=", // password is `sajjad734`
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          first_name: "Jawad",
          last_name: "Haider",
          email: "reader@gmail.com",
          role: "reader",
          password: "mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=", // password is `sajjad734`
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),
};
