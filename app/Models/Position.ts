import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Apply from './Apply'
import PositionSex from 'Contracts/Enums/PositionSex'

export default class Position extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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
    localKey: 'companyId'
  })
  public company: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'studentId'
  })
  public student: BelongsTo<typeof User>

  @hasMany(() => Apply, {
    foreignKey: 'positionId'
  })
  public students: HasMany<typeof Apply>
}
