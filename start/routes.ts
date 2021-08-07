/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ view }) => view.render('home'))

Route.group(() => {
  Route.get('/login', 'AuthController.loginShow')
  Route.get('/register', 'AuthController.studentRegister')
  Route.get('/registerCompany', 'AuthController.companyRegister')
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.studentStore')
  Route.post('/registerCompany', 'AuthController.companyStore')
}).middleware('guest')

Route.get('/logout', 'AuthController.logout')

Route.get('/positions', ({ view }) => view.render('position_list'))
Route.get('/position/:id', ({ view }) => view.render('position'))

Route.get('/about', ({ view }) => view.render('about_us'))

Route.get('/usercp', ({ view }) => view.render('user_dashboard')).middleware('auth')
Route.group(() => {
  Route.get('/positions', 'CompaniesController.all')
  Route.get('/position/create', 'CompaniesController.createShow')
  Route.post('/position/create', 'CompaniesController.store')
  Route.get('/position/:id', 'CompaniesController.index')
  
}).prefix('/company').middleware('auth')