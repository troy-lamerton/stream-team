
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  var tableName = 'scenes'
  return knex(tableName).del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex(tableName).insert({
          id: 1, 
          url: 'http://knexjs.org/docs/images/github.png',
          title: 'First test scene',
          imageBase64: '', 
          description: ''
        }),
        knex(tableName).insert({
          id: 2, 
          url: 'http://knexjs.org/docs/images/github.png',
          title: 'Second test scene',
          imageBase64: '', 
          description: ''})
      ]);
    });
};
