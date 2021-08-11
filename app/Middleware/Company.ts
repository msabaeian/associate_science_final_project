import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRole from 'Contracts/Enums/UserRole'

export default class Guest {
  public async handle ({auth, response}: HttpContextContract, next: () => Promise<void>) {
    if(auth.user?.role !== UserRole.COMPANY){
      return response.redirect('/')
    }
    await next()
  }
}
