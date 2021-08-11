import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
    public about(ctx: HttpContextContract){
        return ctx.view.render('about_us')
    }
}
