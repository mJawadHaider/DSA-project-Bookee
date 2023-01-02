"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "books",
      [
        {
          name: "A Game Of Thrones - The Illustrated Edition",
          author: "George R. R. Martin",
          genre: "Fiction-Fantasy",
          description:
            "Published in celebration of the twentieth anniversary of George R. R. Martin’s landmark series, this lavishly illustrated special edition of A Game of Thrones—with gorgeous full-page illustrations in every chapter— is now fully optimised for ebook readers.",
          image: "AGameOfThrones.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "A Wizard of Earthsea",
          author: "Ursula K. Le Guin",
          genre: "Fiction-Fantasy",
          description:
            "Ged, the greatest sorcerer in all Earthsea, was called Sparrowhawk in his reckless youth. Hungry for power and knowledge, Sparrowhawk tampered with long-held secrets and loosed a terrible shadow upon the world. This is the tale of his testing, how he mastered the mighty words of power, tamed an ancient dragon, and crossed death's threshold to restore the balance.",
          image: "AWizardOfEarthsea.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Fifth Season - The Broken Earth",
          author: "N. K. Jemisin",
          genre: "Fiction-Fantasy",
          description:
            "The Broken Earth trilogy is complete - beginning with The Fifth Season, continuing in The Obelisk Gate (Winner of the Hugo Award for Best Novel) and concluding with The Stone Sky (Winner of the Hugo Award for Best Novel and Nebula Award).",
          image: "TheFifthSeason.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The name of the Wind",
          author: "Patrick Rothfuss",
          genre: "Fiction-Fantasy",
          description:
            "The lyrical fantasy masterpiece about stories, legends and how they change the world. The name of the Wind is an absolute must-read for any fan of fantasy fiction.",
          image: "TheNameOfTheWind.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "It Starts With Us",
          author: "Colleen Hoover",
          genre: "Fiction-Romance",
          description:
            "Before It Ends with Us, it started with Atlas. Colleen Hoover tells fan favourite Atlas’s side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us",
          image: "ItStartsWithUs.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "It Ends With Us",
          author: "Colleen Hoover",
          genre: "Fiction-Romance",
          description:
            "From the #1 New York Times bestselling author of It Starts with Us and All Your Perfects, a “brave and heartbreaking novel that digs its claws into you and doesn’t let go, long after you’ve finished it” (Anna Todd, New York Times bestselling author) about a workaholic with a too-good-to-be-true romance can’t stop thinking about her first love.",
          image: "ItEndsWithUs.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Reminders of Him",
          author: "Colleen Hoover",
          genre: "Fiction-Romance",
          description:
            "A troubled young mother yearns for a shot at redemption in this heartbreaking yet hopeful story from #1 New York Times bestselling author Colleen Hoover.",
          image: "RemindersOfHim.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Outlander",
          author: "Diana Gabaldon",
          genre: "Fiction-Romance",
          description:
            "THE FIRST NOVEL IN THE BESTSELLING OUTLANDER SERIES. As seen on Amazon Prime TV. Previously published as Cross Stitch. Claire Randall is leading a double life. She has a husband in one century - and a lover in another.",
          image: "Outlander.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Shining",
          author: "Stephen King",
          genre: "Fiction-Horror",
          description:
            "One of the true classics of horror, now with a new stunning cover look. THE SHINING is regarded as one of Stephen King's masterpieces.",
          image: "TheShining.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Haunting of Hill House",
          author: "Shirley Jackson",
          genre: "Fiction-Horror",
          description:
            "The best-known of Shirley Jackson's novels and a major inspiration for writers like Neil Gaiman and Stephen King as well as the hit Netflix series, The Haunting of Hill House is a chilling story of the power of fear. 'Shirley Jackson's stories are among the most terrifying ever written' Donna Tartt",
          image: "TheHauntingOfHillHouse.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "It",
          author: "Stephen King",
          genre: "Fiction-Horror",
          description:
            "NOW A MAJOR MOTION PICTURE - Stephen King's terrifying classic. 'They float...and when you're down here with me, you'll float, too.' Derry, Maine is just an ordinary town: familiar, well-ordered for the most part, a good place to live.",
          image: "It.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sick in the Head",
          author: "Judd Apatow",
          genre: "Humor",
          description:
            "Before becoming one of the most successful filmmakers in Hollywood, Judd Apatow was the original comedy nerd. At fifteen, he took a job washing dishes in a local comedy club-just so he could watch endless stand-up for free.",
          image: "SickInTheHead.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Harry Potter",
          author: "J.K Rowling",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          image: "book.jpeg",
          rating: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Prisoner of Azhkaban",
          author: "J.K Rownling",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          image: "book.jpeg",
          rating: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "A Confideracy of Dunes",
          author: "John Kennedy Toole",
          genre: "Fiction-Humor",
          description:
            "Released by Louisiana State University Press in 1980, A Confederacy of Dunces is nothing short of a publishing phenomenon. Rejected by countless publishers and submitted by the author's mother years after his suicide, the book won the 1981 Pulitzer Prize for Fiction",
          image: "AConfederacyOfDunes.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "To Kill A Mockingbird",
          author: "Harper Lee",
          genre: "Fiction-Family Life",
          description:
            "A lawyer's advice to his children as he defends the real mockingbird of Harper Lee's classic novel - a black man falsely charged with the rape of a white girl. Through the young eyes of Scout and Jem Finch, Harper Lee explores with exuberant humour the irrationality of adult attitudes to race and class in the Deep South of the 1930s.",
          image: "ToKillAMockingBird.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "1984",
          author: "George Orwell",
          genre: "Fiction-Science Fiction",
          description:
            "Arguably the twentieth century's most famous novel, 1984 is a dystopian study of political tyranny, mind control, paranoia and secret mass surveillance. Following Winston Smith, a diligent desk clerk at the Ministry of Truth, it paints a disturbing portraits of a totalitarian regime when even the thoughts of residents are censured.",
          image: "1984.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "books",
      [
        {
          name: "A Game Of Thrones - The Illustrated Edition",
          author: "George R. R. Martin",
          genre: "Fiction-Fantasy",
          description:
            "Published in celebration of the twentieth anniversary of George R. R. Martin’s landmark series, this lavishly illustrated special edition of A Game of Thrones—with gorgeous full-page illustrations in every chapter— is now fully optimised for ebook readers.",
          image: "AGameOfThrones.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "A Wizard of Earthsea",
          author: "Ursula K. Le Guin",
          genre: "Fiction-Fantasy",
          description:
            "Ged, the greatest sorcerer in all Earthsea, was called Sparrowhawk in his reckless youth. Hungry for power and knowledge, Sparrowhawk tampered with long-held secrets and loosed a terrible shadow upon the world. This is the tale of his testing, how he mastered the mighty words of power, tamed an ancient dragon, and crossed death's threshold to restore the balance.",
          image: "AWizardOfEarthsea.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Fifth Season - The Broken Earth",
          author: "N. K. Jemisin",
          genre: "Fiction-Fantasy",
          description:
            "The Broken Earth trilogy is complete - beginning with The Fifth Season, continuing in The Obelisk Gate (Winner of the Hugo Award for Best Novel) and concluding with The Stone Sky (Winner of the Hugo Award for Best Novel and Nebula Award).",
          image: "TheFifthSeason.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The name of the Wind",
          author: "Patrick Rothfuss",
          genre: "Fiction-Fantasy",
          description:
            "The lyrical fantasy masterpiece about stories, legends and how they change the world. The name of the Wind is an absolute must-read for any fan of fantasy fiction.",
          image: "TheNameOfTheWind.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "It Starts With Us",
          author: "Colleen Hoover",
          genre: "Fiction-Romance",
          description:
            "Before It Ends with Us, it started with Atlas. Colleen Hoover tells fan favourite Atlas’s side of the story and shares what comes next in this long-anticipated sequel to the #1 Sunday Times bestseller It Ends with Us",
          image: "ItStartsWithUs.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "It Ends With Us",
          author: "Colleen Hoover",
          genre: "Fiction-Romance",
          description:
            "From the #1 New York Times bestselling author of It Starts with Us and All Your Perfects, a “brave and heartbreaking novel that digs its claws into you and doesn’t let go, long after you’ve finished it” (Anna Todd, New York Times bestselling author) about a workaholic with a too-good-to-be-true romance can’t stop thinking about her first love.",
          image: "ItEndsWithUs.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Reminders of Him",
          author: "Colleen Hoover",
          genre: "Fiction-Romance",
          description:
            "A troubled young mother yearns for a shot at redemption in this heartbreaking yet hopeful story from #1 New York Times bestselling author Colleen Hoover.",
          image: "RemindersOfHim.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Outlander",
          author: "Diana Gabaldon",
          genre: "Fiction-Romance",
          description:
            "THE FIRST NOVEL IN THE BESTSELLING OUTLANDER SERIES. As seen on Amazon Prime TV. Previously published as Cross Stitch. Claire Randall is leading a double life. She has a husband in one century - and a lover in another.",
          image: "Outlander.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Shining",
          author: "Stephen King",
          genre: "Fiction-Horror",
          description:
            "One of the true classics of horror, now with a new stunning cover look. THE SHINING is regarded as one of Stephen King's masterpieces.",
          image: "TheShining.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Haunting of Hill House",
          author: "Shirley Jackson",
          genre: "Fiction-Horror",
          description:
            "The best-known of Shirley Jackson's novels and a major inspiration for writers like Neil Gaiman and Stephen King as well as the hit Netflix series, The Haunting of Hill House is a chilling story of the power of fear. 'Shirley Jackson's stories are among the most terrifying ever written' Donna Tartt",
          image: "TheHauntingOfHillHouse.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "It",
          author: "Stephen King",
          genre: "Fiction-Horror",
          description:
            "NOW A MAJOR MOTION PICTURE - Stephen King's terrifying classic. 'They float...and when you're down here with me, you'll float, too.' Derry, Maine is just an ordinary town: familiar, well-ordered for the most part, a good place to live.",
          image: "It.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sick in the Head",
          author: "Judd Apatow",
          genre: "Humor",
          description:
            "Before becoming one of the most successful filmmakers in Hollywood, Judd Apatow was the original comedy nerd. At fifteen, he took a job washing dishes in a local comedy club-just so he could watch endless stand-up for free.",
          image: "SickInTheHead.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Harry Potter",
          author: "J.K Rowling",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          image: "book.jpeg",
          rating: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "The Prisoner of Azhkaban",
          author: "J.K Rownling",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
          genre: "Fiction-Story",
          image: "book.jpeg",
          rating: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "A Confideracy of Dunes",
          author: "John Kennedy Toole",
          genre: "Fiction-Humor",
          description:
            "Released by Louisiana State University Press in 1980, A Confederacy of Dunces is nothing short of a publishing phenomenon. Rejected by countless publishers and submitted by the author's mother years after his suicide, the book won the 1981 Pulitzer Prize for Fiction",
          image: "AConfederacyOfDunes.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "To Kill A Mockingbird",
          author: "Harper Lee",
          genre: "Fiction-Family Life",
          description:
            "A lawyer's advice to his children as he defends the real mockingbird of Harper Lee's classic novel - a black man falsely charged with the rape of a white girl. Through the young eyes of Scout and Jem Finch, Harper Lee explores with exuberant humour the irrationality of adult attitudes to race and class in the Deep South of the 1930s.",
          image: "ToKillAMockingBird.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "1984",
          author: "George Orwell",
          genre: "Fiction-Science Fiction",
          description:
            "Arguably the twentieth century's most famous novel, 1984 is a dystopian study of political tyranny, mind control, paranoia and secret mass surveillance. Following Winston Smith, a diligent desk clerk at the Ministry of Truth, it paints a disturbing portraits of a totalitarian regime when even the thoughts of residents are censured.",
          image: "1984.jpeg",
          rating: 2.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};
