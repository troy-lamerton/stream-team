
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let tableName = 'scenes'
  return knex(tableName.del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(tableName).insert({
          id: 1, 
          title: 'First test scene',
          imageBase64: '', 
          url: 'http://knexjs.org/docs/images/github.png',
          description: ''
        }),
        knex(tableName).insert({
          id: 2, 
          title: 'Second test scene',
          imageBase64: '', 
          url: 'http://knexjs.org/docs/images/github.png',
          description: ''
        })
      ]);
    });
};
