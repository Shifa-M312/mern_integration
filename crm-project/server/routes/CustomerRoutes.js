const express = require('express');
const router = express.Router();
const { addCustomer, getCustomers, updateCustomer, deleteCustomer  } = require('../controllers/CustomerController');

router.post('/add', addCustomer);
router.get('/all', getCustomers);
router.put('/update/:id', updateCustomer);    
router.delete('/delete/:id', deleteCustomer); 



module.exports = router;
