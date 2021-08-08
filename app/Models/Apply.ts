import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Position from './Position'
import User from './User'

export default class Apply extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @column()
  public positionId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User , {
    foreignKey: 'studentId'
  })
  public student: BelongsTo<typeof User>

  @belongsTo(() => Position, {
    foreignKey: 'positionId'
  })
  public position: BelongsTo<typeof Position>
}
