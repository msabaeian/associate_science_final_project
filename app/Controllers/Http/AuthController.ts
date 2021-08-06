import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import {schema,rules} from '@ioc:Adonis/Core/Validator'

export default class UsersController {

    public loginShow(ctx: HttpContextContract){
        return ctx.view.render('login')
    }

    public async login(ctx: HttpContextContract){
        const {email, password} = ctx.request.all()
        try{
            await ctx.auth.attempt(email, password, true)
            return ctx.response.redirect('/')
        }catch(error){
            ctx.session.flash('error', 'نام کاربری و یا کلمه عبور وارد شده اشتباه است')
            return ctx.response.redirect('back')
        }
    }

    public async logout(ctx: HttpContextContract){
        await ctx.auth.logout()
        return ctx.response.redirect('/')
    }

    public studentRegister(ctx: HttpContextContract){
        
    }

    public async studentStore(ctx: HttpContextContract){
        
    }

    public async companyRegister(ctx: HttpContextContract){
        
    }

    public async companyStore(ctx: HttpContextContract){
        
    }


}