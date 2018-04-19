var mongoose = require("mongoose");
var productSchema = require("./product.schema.server");

var productModel = mongoose.model('productModel', productSchema);
var userModel = require("../user/user.model.server");

productModel.updateProduct = updateProduct;
productModel.findProductById = findProductById;
productModel.deleteProduct = deleteProduct;
productModel.createProductForUser = createProductForUser;
productModel.findAllProductsForUser = findAllProductsForUser;
productModel.findAllProducts = findAllProducts;

module.exports = productModel;

function updateProduct(productId, product){
  return productModel.update({_id: productId}, product);
}

function findProductById(productId){
  return productModel.findOne({_id: productId});
}

function deleteProduct(productId) {
  productModel.findById(productId).then(
    function (product) {
      console.log("productHere!");
      console.log(product);
      userModel.findUserById(product._user)
        .then(function (user) {
          console.log(user);
          user.products.pull({_id: productId});
          user.save();
        })
    });
  console.log("deleteHere!!!");
  console.log("======");
  console.log(productId);
  return productModel.remove({
      _id : productId
    }
  );
}

function createProductForUser(userId,product) {

  product._user = userId;
  // product.image = "";
  console.log("=====modelCreate====");
  console.log(product);

  // return productModel.create(product);

  return productModel.create(product).then(
    function (resProduct) {
      console.log("=======");
      console.log(resProduct);
      userModel.findUserById(resProduct._id).then(
        function (user) {
          user.products.push(resProduct);
          // the newly created one will not be added into users without this line
          return user.save();
        }
        );
      return resProduct;
    },
    function (err) {
      console.log(err);
    });
}

function findAllProductsForUser(userId) {
  return productModel.find({_user: userId});
}

function findAllProducts() {
  return productModel.find();
}
