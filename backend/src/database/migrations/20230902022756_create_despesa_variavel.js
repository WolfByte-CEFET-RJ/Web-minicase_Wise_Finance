/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Despesa_Variavel', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.string('Nome').notNullable();
        table.decimal('Valor', 10, 2).notNullable();
        table.date('Data').notNullable();
        table.text('Descricao');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("Despesa_Variavel")
};
