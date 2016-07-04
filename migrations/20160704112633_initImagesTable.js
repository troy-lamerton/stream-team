
exports.up = function(knex, Promise) {
  console.log('Create images table')

  return knex.schema.createTableIfNotExists('images', function (table) {
    table.increments('id')
    table.string('title')
    /* Storing raw image data in the cell will mean operations on this table will use a lot of server memory.
     * Another option would be to store a reference to a row in a seperate table which contains the image data.
     * Then we would only access the image data when required, not every time we access rows in the images table.*/
    table.binary('imageData') // stored in postgreSQL as the postgres datatype bytea
    table.string('url')
    table.string('description')
  })
};

exports.down = function(knex, Promise) {
  console.log('Drop images table')

  return knex.schema.dropTableIfExists('images')
};
