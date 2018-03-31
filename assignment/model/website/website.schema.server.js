module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var websiteSchema = mongoose.Schema({
        _user: {
            type: Schema.Types.ObjectId,
            ref:'User',
            required: true},
        name : {type : String, required : true},
        description : String,
        pages : [{
            type : Schema.Types.ObjectId,
            ref : 'Page'
        }],
        dateCreated : {
            type : Date,
            default: Date.now()
        }
    }, {collection: 'website'});

    return websiteSchema;
}


