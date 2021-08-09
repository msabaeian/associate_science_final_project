import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Apply from './Apply'
import PositionSex from 'Contracts/Enums/PositionSex'
import PositionType from './PositionType'
import PositionCategory from './PositionCategory'

export default class Position extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryId: number

  @column()
  public companyId: number

  @column()
  public studentId: number | null

  @column()
  public type: number

  @column()
  public sex: PositionSex

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User , {
    foreignKey: 'companyId'
  })
  public company: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'studentId'
  })
  public student: BelongsTo<typeof User>

  @belongsTo(() => PositionType, {
    foreignKey: 'type'
  })
  public positionType: BelongsTo<typeof PositionType>

  @belongsTo(() => PositionCategory, {
    foreignKey: 'categoryId'
  })
  public category: BelongsTo<typeof PositionCategory>

  @hasMany(() => Apply)
  public students: HasMany<typeof Apply>
}
