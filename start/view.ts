import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'

View.global('public', (url: string) => {
  return Env.get("PUBLIC_URL")+url
})
