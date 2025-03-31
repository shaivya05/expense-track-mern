const router = require('express').Router();
const { fetchExpenses,addExpenses,deleteExpenses}=require('../controllers/ExpenseController');
//fetch all expenses based on user_id
router.get('/',fetchExpenses);
//add expenses
router.post('/',addExpenses);
//delete expenses
router.delete('/:expenseId',deleteExpenses);
module.exports=router;