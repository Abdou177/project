

const categories = require('../modules/categoryModel')

const categoryCtrl = {
    createCategory: async(req,res) =>{
        try {
            const {name}=req.body;
            const category = await categories.findOne({name});
            
            if (category){
                return res.status(400).json({msg: 'This category already exists',category});
            } 
            
            const newCategory = new categories({name})
          await newCategory.save()
            res.status(200).json({msg: 'Created a category',newCategory})
        }
         catch (error) {
            return res.status(500).json({msg: 'errer server......'});
        }
    }
};
module.exports = categoryCtrl