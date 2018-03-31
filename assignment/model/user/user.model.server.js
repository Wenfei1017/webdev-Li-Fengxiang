module.exports = function(mongoose, conn){
    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = conn.model('User', userSchema);
    var ObjectId = mongoose.Types.ObjectId;

    var api = {
        'createUser': createUser,
        'findUserById': findUserById,
        'findUserByUsername': findUserByUsername,
        'findUserByCredentials': findUserByCredentials,
        'updateUser': updateUser,
        'deleteUser': deleteUser,
        'addWebsiteToUser': addWebsiteToUser,
        'removeWebsiteFromUser': removeWebsiteFromUser
    }
    return api;

    function createUser(user){
        return userModel.findOne({username: user.username}).then(
            function(existingUser){
                if(existingUser == null || existingUser == undefined || existingUser == ""){
                    return userModel.create(user);
                }
                else{
                    return new Promise(function(resolve, reject){
                        reject('Username already exists.');
                    });
                }
            },
            function (err){
                return new Promise(function(resolve, reject){
                    reject(err);
                });
            }
        );
    }

    function findUserById(userId){
        return userModel.findById(userId);
    }

    function findUserByUsername(uname){
        return userModel.findOne({username : uname})
    }

    function findUserByCredentials(uname, pswrd){
        return userModel.findOne({
            username : uname,
            password : pswrd
        });
    }

    function updateUser(userId, user){
        return userModel.update({_id: userId}, user)
    }

    function deleteUser(userId){
        return userModel.deleteOne({_id: userId});
    }

    function addWebsiteToUser(userId, websiteId){
        userModel.findById(userId).then(
            function(user){
                user.websites.push(websiteId);
                user.save();
            },
            function(error){
                console.log(error);
            }
        );
    }

    function removeWebsiteFromUser(userId, websiteId){
        userModel.findById(userId).then(
            function(user){
                user.websites.pull(websiteId);
                user.save();
            },
            function(error){
                console.log(error);
            }
        );
    }
}
