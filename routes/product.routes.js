const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
module.exports = router;

//create
router.post('/create', product_controller.product_create);

//read
router.get('/:id', product_controller.product_details);

//list
router.get('', product_controller.product_list);

// update
router.put('/:id/update', product_controller.product_update);

// delete
router.delete('/:id/delete', product_controller.product_delete);