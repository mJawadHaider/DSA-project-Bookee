module.exports = {
    up: queryInterface => queryInterface.bulkInsert('users', [
        {
            first_name: 'basit',
            last_name: 'ali',
            email: 'admin@gmail.com',
            role: 'admin',
            phone_number: '1-(923)-244-4052',
            password: 'mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=', // password is `sajjad734`
            created_at: new Date(),
            updated_at: new Date(),
        },  
        {
            first_name: 'asadhussain',
            last_name: 'ali',
            email: 'user@gmail.com',
            role: 'candidate',
            phone_number: '1-(923)-244-4053',
            password: 'mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=', // password is `sajjad734`
            created_at: new Date(),
            updated_at: new Date(),
        },
    ], {}),

    down: queryInterface => queryInterface.bulkDelete('users', [
        {
            first_name: 'basit',
            last_name: 'ali',
            email: 'admin@gmail.com',
            role: 'admin',
            phone_number: '1-(923)-244-4052',
            password: 'mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=', // password is `sajjad734`
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            first_name: 'asadhussain',
            last_name: 'ali',
            email: 'user@gmail.com',
            role: 'candidate',
            phone_number: '1-(923)-244-4053',
            password: 'mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=', // password is `sajjad734`
            created_at: new Date(),
            updated_at: new Date(),
        },
    ], {}),
};


