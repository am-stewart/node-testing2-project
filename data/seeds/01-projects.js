exports.seed = function (knex, Promise) {
  return knex("projects")
    .truncate()
    .then(function() {
      return knex('projects').insert([
        { project_name: "plant garden" },
        { project_name: "redo laundry room" },
        { project_name: "paint bedroom" },
      ]);
    });
};