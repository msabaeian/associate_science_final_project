import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Apply from 'App/Models/Apply'
import Position from 'App/Models/Position'
import PositionType from 'App/Models/PositionType'

export default class PositionsController {
    public async all(ctx: HttpContextContract){
        const {page = 1,search = '',type = '',sex = ''} = ctx.request.qs()
        const positions = Position.query().preload("company").whereNull("studentId")
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
        const id = +ctx.params.id
        const position = await Position.query().preload("positionType").preload("company").where('id', id).first()
        if(!position){
            return ctx.response.redirect('/')
        }
        const apply = await Apply.query().where('positionId',id).andWhere('studentId',ctx.auth.user?.id || '').first()
        
        return ctx.view.render('position', {position, appliedBefore: !!apply, isYours:position?.companyId === ctx.auth.user?.id})
    }
    
    public async apply(ctx: HttpContextContract){
        const id = +ctx.params.id
        const apply = await Apply.query().where('positionId',id).andWhere('studentId',ctx.auth.user?.id || '').first()
        if(apply){
            ctx.session.flash('error', 'شما قبلا برای این موقعیت درخواست ثبت کرده‌اید')
            return ctx.response.redirect().back()
        }
        Apply.create({
            positionId: id,
            studentId: ctx.auth.user?.id,
        })
        ctx.session.flash('success', 'درخواست شما با موفقیت ثبت شد!')
        return ctx.response.redirect().back()
    }
    
    public async studentAppliedPositions(ctx: HttpContextContract){
        const applies = await Apply.query().preload("position", (query) => { query.preload("company").preload("student") }).where('studentId',ctx.auth.user?.id || 0)
        return ctx.view.render('user_dashboard', {applies})
    }
}