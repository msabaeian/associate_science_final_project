import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Position from 'App/Models/Position'
import PositionType from 'App/Models/PositionType'

export default class PositionsController {
    public async all(ctx: HttpContextContract){
        const {page = 1,search = '',type = '',sex = ''} = ctx.request.qs()
        const positions = Position.query().preload("company")
        if(search){
            positions.where('title', 'like', `%${search}%`)
        }
        if(type){
            positions.where('type', type)
        }
        if(sex){
            positions.where('sex', sex)
        }
        const types = await PositionType.all()
        return ctx.view.render('position_list', {positions: await positions.paginate(page, 5), types})
    }

    public async index(ctx: HttpContextContract){
        return ctx.view.render('position')
    }
}