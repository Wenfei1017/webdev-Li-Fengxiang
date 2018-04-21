module.exports = function(app) {
  var productModel = require('../model/product/product.model.server');

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../../src/assets/uploads' });

  app.put("/api/product/:productId",updateProduct);
  app.get("/api/product/:productId",findProductById);
  app.delete("/api/user/:userId/product/:productId", deleteProduct);
  app.post("/api/user/:userId/product", createProductForUser);
  app.get("/api/user/:userId/products",findAllProductsForUser);
  app.get("/api/product", findAllProducts);
  app.get("/api/resetImage", resetImage);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  var path = require('path');

  var imageUrl= "";

  function uploadImage(req, res) {
    console.log("=======");
    console.log("uploadImage");
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    console.log("=======");
    console.log(userId);
    console.log(myFile);
    // condition when myFile is null
    if (myFile == null) {
      res.redirect("/seller/" + userId);
      return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;// new file name in upload folder
    var path = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    // find widget by id
    imageUrl = filename;
    baseUrl = "http://localhost:4200";
    console.log("testRedirect");
    console.log("========");
    console.log(filename);
    // res.redirect("http://localhost:4200" + "/seller/" + userId + "/products/new");
    // res.　
    res.status(200);
  }

  function resetImage(req, res) {
    imageUrl = "";
  }

  function updateProduct(req, res) {
    const productId = req.params["productId"];
    var newProduct= req.body;
    newProduct.imageUrl = imageUrl;
    productModel.updateProduct(productId,newProduct).then(
      function (product){
        if(product){
          res.status(200).json(product);
        } else {
          res.status(404).send("product not found when update.");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    )
  }

  function findProductById(req,res) {
    const productId = req.params["productId"];
    productModel.findProductById(productId).then(
      function (product){
        if(product){
          res.status(200).json(product);
        } else {
          res.status(404).send("product not found.");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    )
  }

  function deleteProduct(req,res) {
    const productId = req.params["productId"];
    console.log("testDeleteServer");
    productModel.deleteProduct(productId).then(
      function (status) {
        res.json(status);
      },
      function (error) {
        res.status(400).send(error);
      }
    );
  }

  function createProductForUser(req,res) {
    console.log("productForUser!!");
    const userId = req.params["userId"];
    const product = req.body;
    if (imageUrl != "") {
      product.imageUrl = imageUrl;
    }
    productModel.createProductForUser(userId,product).then(
      function(product){
        console.log("comeback");
        console.log(product);
        res.status(200).json(product);
      },
      function (error){
        res.status(404).send(error);
      }
    );
    // reset imageUrl
    resetImage();
  }

  function findAllProductsForUser(req,res) {
    console.log("findAllProductsForUser");
    const userId = req.params["userId"];
    console.log(userId);
    productModel.findAllProductsForUser(userId).then(
      function(products){
        res.status(200).json(products);
      },
      function (error) {
        res.status(404).send(error);
      }
    )
  }

  function findAllProducts(req,res) {

    productModel.findAllProducts().then(
      function(products){
        res.status(200).json(products);
      },
      function (error) {
        res.status(404).send(error);
      }
    );
  }
}
