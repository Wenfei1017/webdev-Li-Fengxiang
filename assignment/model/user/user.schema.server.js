module.exports = function(mongoose){
  var Schema = mongoose.Schema;

  var userSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{
            type: Schema.Types.ObjectId,
            ref: 'Website'
        }],
        dateCreated: {type: Date, default: Date.now() }
    }, {collection: 'user'});

    return userSchema;
}
