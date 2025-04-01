const UserModel=require('../models/user');
const addExpenses=async (req,res)=>{
    const body =req.body;
    const{_id}=req.user;
    try{
        const userData=await UserModel.findByIdAndUpdate(
            _id,//user_id
            {
                $push:{expenses:body}
            },
            {
                new:true//for returning the updated document
            });
            return res.status(200).json({
                message:'Expense added succesfuly',
                success:true,
                data:userData?.expenses

            });
        
    } 
    catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err,success:false
        })
    }
}
const fetchExpenses=async (req,res)=>{
    const body =req.body;
    const{_id}=req.user;
    try{
        const userData=await UserModel.findById(
            _id).select('expenses');//user_id
            
            return res.status(200).json({
                message:'Fetched Expense succesfuly',
                success:true,
                data:userData?.expenses

            });
        
    } 
    catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err,
            success:false
        })
    }
    
}
const deleteExpenses= async(req,res)=>{
    
    const{_id}=req.user;
    const{ expenseId }=req.params;
    try{
        const userData=await UserModel.findByIdAndUpdate(
            _id,//user_id
            {
                $pull:{expenses:{_id:expenseId}}
            },
            {
                new:true
            });
            return res.status(200).json({
                message:'Expense deleted succesfuly',
                success:true,
                data:userData?.expenses

            });
        
    } 
    catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err,success:false
        })
    }
    
}
module.exports={
    addExpenses,fetchExpenses,deleteExpenses
}