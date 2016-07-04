
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('images').insert({
          id: 1, 
          title: 'First test image',
          imageData: '', 
          url: 'http://knexjs.org/docs/images/github.png'
        }),
        knex('images').insert({
          id: 2, 
          title: 'Second test image',
          imageData: '', 
          url: 'http://knexjs.org/docs/images/github.png'
        })
      ]);
    });
};
