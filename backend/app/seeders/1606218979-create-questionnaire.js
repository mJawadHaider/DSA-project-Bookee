module.exports = {
    up: queryInterface => queryInterface.bulkInsert('questionnaire', [
        {
            test: {  
                'question' : 'What type of JaveScript Language is ?',
                'option': {
                    'f': 'Object Oriented',
                    's':  'Object-Based',
                    'c': 'Assembly-Language',
                    'd': 'High-Level'
                },
                'correct' : 'Object Oriented'
            },
            is_active :true,
            type:'javascript',
            level: 'simple',
            created_at: new Date(),
            updated_at: new Date(),
        },  
    ], {}),

    down: queryInterface => queryInterface.bulkDelete('questionnaire', [
        { test: {  
            'question' : 'What type of JaveScript Language is ?',
            'option': {
                'f': 'Object Oriented',
                's':  'Object-Based',
                'c': 'Assembly-Language',
                'd': 'High-Level'
            },
            'correct' : 'Object Oriented'
        },
        is_active :true,
        type:'javascript',
        level: 'simple',
        created_at: new Date(),
        updated_at: new Date(),
        },
    ], {}),
};


