module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

    var widgetSchema = mongoose.Schema({
        _page: {
            type: Schema.Types.ObjectId,
            ref: 'Page',
            required: true
        },
        type: {
            type: String,
            enum : ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'],
            default: 'HEADING'
        },
        name: {type: String, required: true},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: {
            type: Boolean,
            default: true
        },
        formatted:{
            type: Boolean,
            default: true
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        }
    }, {collection: 'widget'});

    return widgetSchema;
}



