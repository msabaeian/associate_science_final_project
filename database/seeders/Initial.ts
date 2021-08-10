import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PositionCategory from 'App/Models/PositionCategory'
import PositionType from 'App/Models/PositionType'
import User from 'App/Models/User'
import UserRole from 'Contracts/Enums/UserROle'

export default class InitialSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      email: 'admin@karbama.ir',
      name: "محمد صبائیان",
      password: '123',
      phone: '09378470956',
      role: UserRole.ADMIN
    })

    await PositionType.createMany([
      {
        name: 'تمام‌وقت'
      },
      {
        name: 'پاره‌وقت'
      },
      {
        name: 'کارآموزی'
      }
    ])

    await PositionCategory.createMany([
      {
        name: 'وب،‌ برنامه‌نویسی و نرم‌افزار'
      },
      {
        name: 'مهندسی برق و الکترونیک'
      },
      {
        name: 'مالی و حسابداری'
      },
      {
        name: 'هتلداری'
      }
    ])

  }
}
