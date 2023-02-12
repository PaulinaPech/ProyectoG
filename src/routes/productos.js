const express = require ('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('productos/add');
});

router.post('/add', isLoggedIn, async (req, res)=>{
   const { nombre, precio, stock } = req.body;
   const newProducto = {
    nombre,
    precio,
    stock
   };
   await pool.query('INSERT INTO producto SET ?', [newProducto]);
   req.flash('exito', 'Producto guardado exitosamente');
   res.redirect('/productos');
});

router.get('/', isLoggedIn, isLoggedIn, async (req, res)=>{
    const productos = await pool.query('SELECT * FROM producto');
    res.render('productos/list', {productos});
});

module.exports = router;
