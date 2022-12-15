module.exports.Validations = {
  CNIC: {
    Format: 'XXXXX-XXXXXXX-X',
    Regex: /^\d{5}-\d{7}-\d{1}$/,
  },
  PhoneNumber: {
    Format: 'XX-XXXXXXXXXX',
    Regex: /^\d\d-\d{10}$/,
  },
};

module.exports.CRUD = {
  Created: 'created',
  Deleted: 'deleted',
  Read: 'read',
  Updated: 'updated',
};

module.exports.STATUS = {
  User: {
    Active: 'active',
    Inactive: 'inactive',
  },
  Book: {
    reading: 'reading',
    complete: 'complete',
    inQueue: 'inQueue'
  }
};

module.exports.ROLES = {
  admin: 'admin',
  reader: 'reader',
};
