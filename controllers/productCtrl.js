const Products = require('../modules/productModel');

const productCtrl = {
   CreateProduct: async (req,res)=>{
    const { product_id, title, price, description, content, images, category} = req.body;
    try {
        
        console.log(req.body)
        if
        (!images) {
            return res.status(400).json({msg: 'no image upload..'})
        }
        

        const product = await Products.findOne({product_id})
        if(product)
        return res.status(400).json({msg:'This product already exists..'})

        const newProduct = new Products({ product_id, title: title.toLowerCase(), price, description, content, images, category})

        await newProduct.save()
        res.status(500).json({msg:'Created a product with succes'})
    
    } 
    catch (error) {
        return res.status(500).json({msg:'errer server'})
        
    }
}
};