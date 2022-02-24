
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments();
    tbl.string('project_name', 128).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};
