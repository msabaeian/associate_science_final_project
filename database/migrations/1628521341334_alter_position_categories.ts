import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Positions extends BaseSchema {
  protected tableName = 'positions'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.integer('category_id').unsigned().references('id').inTable('position_categories')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('category_id')
    })
  }
}
