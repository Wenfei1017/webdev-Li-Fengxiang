var mongoose = require("mongoose");
var cartSchema = require("./cart.schema.server");

var cartModel = mongoose.model('cartModel', cartSchema);
var userModel = require("../user/user.model.server");

cartModel.updateCart = updateCart;
cartModel.addCartToList = addCartToList;
cartModel.findAllCarts = findAllCarts;
cartModel.deleteCart = deleteCart;

module.exports = cartModel;

function updateCart(cartId, cart) {
  return cartModel.update({_id: cartId}, Cart)
}

function addCartToList(userId,cart){
  console.log("addCartToList!!!");
  console.log(cart);

  return cartModel.findOne({
    _user: userId,
    title: cart.product.title,
  }).then(
    function (resCart) {
      if(resCart){
        resCart.quantity += 1;
        return cartModel.update({_id: resCart._id}, resCart)
      }else{
        return cartModel.create(cart).then(
          function (resCart) {
            console.log(resCart);
            userModel.findUserById(resCart._user).then(
              function (user) {
                user.carts.push(resCart);
                return user.save();
              }
            );
            return resCart;
          },
          function (error) {
            console.log(error);
          }
        );
      }
    }
  )
}

function findAllCarts(userId){
  return cartModel.find({_user: userId});
}

function deleteCart(cartId){
  cartModel.findById(cartId).then(
    function (cart) {
      userModel.findUserById(cart._user)
        .then(function (user) {
          user.carts.pull({_id: cartId});
          user.save();
        })
  });

  return cartModel.remove({
    _id : cartId
    }
  );
}
