import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Position from 'App/Models/Position'
import User from 'App/Models/User'
import PositionSex from 'Contracts/Enums/PositionSex'

export default class PositionsController {
    public async all(ctx: HttpContextContract){
        const {page = 1,search = "",type} = ctx.request.all()
        const positions = await Database.query().select('*').from('positions').leftJoin('users','users.id','positions.company_id')
        return ctx.view.render('position_list', {positions})
    }

    public async index(ctx: HttpContextContract){
        return ctx.view.render('position')
    }
}