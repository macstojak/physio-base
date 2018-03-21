var mongoose = require("mongoose");
var Physiotherapist = require("./models/physiotherapist");
var Address = require("./models/physiotherapistaddress")
var data =[
    {
        firstname: "Agnieszka",
        lastname: "Morozowska",
        pesel: "880230150001",
        address:{
            streetname: "Zamkowa",
            nrblock: "2",
            nrflat: "3",
            zipcode: "16-062",
            town: "Sokółka"
        }
    },
     {
        firstname: "Michał",
        lastname: "Radomski",
        pesel: "870115200123",
        address:{
            streetname: "Depowa",
            nrblock: "10",
            nrflat: "111",
            zipcode: "15-022",
            town: "Białystok"
        }
    },
     {
        firstname: "Katarzyna",
        lastname: "Grudziądzka",
        pesel: "880230150001",
        nrpwz: "40012834",
        address:{
            streetname: "Konwaliowa",
            nrblock: "112",
            nrflat: "323",
            zipcode: "15-012",
            town: "Białystok"
        }
    }
    ]

function seedDB()
{
    Physiotherapist.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }else
        {
            console.log("Removed all the users!");
                data.forEach(function(seed)
                {
                      var newAddress = {
                            streetname: seed.address.streetname,
                            nrblock: seed.address.nrblock,
                            nrflat: seed.address.nrflat,
                            zipcode: seed.address.zipcode,
                            town: seed.address.town
                        }
                        Address.create(newAddress, function(err, address){
                             if(err){
                                 console.log(err);
                             }else{
                                 address.save();
                                 var newPhysio = {
                                firstname: seed.firstname,
                                lastname: seed.lastname,
                                pesel: seed.pesel,
                                    }
                            Physiotherapist.create(newPhysio, function(err, physiotherapist)
                            {
                                if(err)
                                {
                                    console.log(err);
                                }else
                                {
                                   physiotherapist.address.push(address._id);
                                physiotherapist.save();
                                  
                                        }
                                    });
                             }
                                
                        })
                     
                    }
                );
        }
    });
}



module.exports = seedDB;