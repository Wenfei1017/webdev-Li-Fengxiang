module.exports = function(app){
  var cartModel = require('../model/cart/cart.model.server');
  // var productModel = require('../model/product/product.model.server');
  app.put("/api/cart/:cartId", updateCartList);
  app.post("/api/user/:userId/cart", addToCartList);
  app.get("/api/user/:userId/cart", findCartList);
  app.delete("/api/cart/:cartId", deleteCartForUser);

  function updateCartList(req, res){
    var cartId = req.params['cartId'];
    var newCart = req.body;

    cartModel.updateCart(cartId, newCart).then(
      function (newCart){
        if(newCart){
          res.status(200).json(newCart);
        } else{
          res.status(404).send("cart not found when update.");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    );
  }

  function addToCartList(req, res){
    console.log("test=======");
    var userId = req.params['userId'];
    var newCart = req.body;
    newCart.title = newCart.product.title;
    newCart._user = userId;

    cartModel.addCartToList(userId,newCart).then(
      function (newCart) {
        if(newCart){
          res.status(200).json(newCart);
        } else{
          res.status(404).send("cart not found when update.");
        }
      },
      function (error) {
        res.status(400).send(error);
      }
    );
  }

  function findCartList(req, res){
    var userId = req.params['userId'];
    cartModel.findAllCarts(userId).then(
      function (cartList){
        res.status(200).json(cartList);
      },
      function (error){
        res.status(400).send(error);
      }
    )
  }

  function deleteCartForUser(req, res){
    var cartId = req.params['cartId']
    cartModel.deleteCart(cartId).then(
      function (carts) {
        res.status(200).json(carts);
      },
      function (error) {
        res.status(400).send(error);
      }
    );
  }
}

