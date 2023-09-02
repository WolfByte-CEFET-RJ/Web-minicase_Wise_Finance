/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Limite_Mensal', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.decimal('Valor_Limite', 10, 2).notNullable();
        table.integer('Mes_Definido').notNullable();
        table.integer('Ano_Definido').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("Limite_Mensal")
};
