/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('Relatorio_Mensal', function (table) {
        table.increments('ID').primary();
        table.integer('ID_Usuario').unsigned().references('ID').inTable('Usuario');
        table.text('Link_Relatorio');
        table.integer('Mes').notNullable();
        table.integer('Ano').notNullable();
        table.timestamp('Data_Criacao').defaultTo(knex.fn.now()); 
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("Relatorio_Mensal")
};
