const category = require('../modules/categoryModel');
const categoryCtrl = {
    createCategory: async(req,res) =>{
        const {name}=req.body;
        try {
            const category = await categorys.findOne({name});
            
            if (category) 
            return res.status(400).json({msg: 'This category already exists'});
            const newCategory = new Category({name});
            res.status(200).json({msg: 'Created a category',name})
            await newCategory.save();
            res.status(200).json({msg: 'Created a category'})
        }
         catch (error) {
            return res.status(500).json({msg: 'errer server......'});
        }
    }
}
module.exports = categoryCtrl