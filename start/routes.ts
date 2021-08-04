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

Route.get('/login', ({ view }) => view.render('login'))

Route.get('/register', ({ view }) => view.render('register'))

Route.get('/registerCompany', ({ view }) => view.render('register_company'))

Route.get('/positions', ({ view }) => view.render('position_list'))
Route.get('/position/:id', ({ view }) => view.render('position'))

Route.get('/about', ({ view }) => view.render('about_us'))

Route.get('/usercp', ({ view }) => view.render('user_dashboard'))


Route.group(() => {
  Route.get('/positions', ({ view }) =>  view.render('company_positions'))
  Route.get('/position/:id', ({ view }) => view.render('company_position'))
  
}).prefix('/company')