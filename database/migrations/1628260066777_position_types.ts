import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PositionTypes extends BaseSchema {
  protected tableName = 'position_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
