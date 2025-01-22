db = db.getSiblingDB('questionarios');
db.users.insertMany([
  { username: 'lecturer', password:'$2b$11$43cwpvCwSZy0faDFFXQ4LOCzx/pDOHcnfWpmhd6ZuvVOvNfPggvB.', role: 'lecturer' },
  { username: 'student', password:'$2b$11$NFCVkBweSpSGgvopm8Jw/.TUIsWtoMTNhSTEETEQ9tsnbcaZgP4sG', role: 'student' },
]);