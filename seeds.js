var mongoose = require("mongoose");
var User = require("./models/user");

var data = [
    {
        username:"Admin",
        password:"one100miles!"
    },
    {
        username:"MacStok",
        password:"tremendous123!"
    }
    ];

function seedDB()
{
    User.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }else
        {
            console.log("Removed all the users!");
                // data.forEach(function(seed)
                // {
                // User.create(seed, function(err, user)
                // {
                //     if(err)
                //     {
                //         console.log(err);
                //     }else
                //     {
                //                 user.save();
                //                 console.log("Created new user");
                //             }
                //         });
                //     }
                // );
        }
    });
}



module.exports = seedDB;