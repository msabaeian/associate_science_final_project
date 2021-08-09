import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PositionCategories extends BaseSchema {
  protected tableName = 'position_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
