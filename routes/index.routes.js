const express = require('express')
const router = express.Router()

// detector de sesión
const ensureLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')

// detector de roles & sesión
const checkRole = role => (req, res, next) => req.isAuthenticated() && req.user.role.includes(role) ? next() : res.render('auth/login', { errorMsg: 'Área restringida' })

const checkAdmin = () => req.user.role.includes('ADMIN')          // Alternativa
const checkUser = () => req.user.role.includes('USER')            // Alternativa
const checkGuest = () => req.user.role.includes('GUEST')          // Alternativa



// Rutas
router.get('/', (req, res, next) => res.render('index'))
router.get('/profile', ensureLoggedIn, (req, res) => res.render('profile', req.user))
router.get('/admin', checkRole('ADMIN'), (req, res) => res.render('admin'))

module.exports = router