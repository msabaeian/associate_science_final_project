import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import PositionSex from 'Contracts/Enums/PositionSex'

export default class PositionSexes extends BaseSchema {
  protected tableName = 'positions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('sex').defaultTo(PositionSex.ALL)
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('sex')
    })
  }
}
