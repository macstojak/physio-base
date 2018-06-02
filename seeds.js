var mongoose = require("mongoose");
var Physiotherapist = require("./models/physiotherapist");
var Address = require("./models/address");
var Supervisor = require("./models/supervisor");
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
    }
    ];
var supervisordata = [
     {
        firstname: "Katarzyna",
        lastname: "Grudziądzka",
        pesel: "90100250032",
        nrpwz: "40012834",
        address:{
            streetname: "Konwaliowa",
            nrblock: "112",
            nrflat: "323",
            zipcode: "15-012",
            town: "Białystok"
        }
    },
     {
        firstname: "Mariola",
        lastname: "Stankiewicz",
        pesel: "78110214014",
        nrpwz: "8981809",
        address:{
            streetname: "Wierzbowa",
            nrblock: "10",
            nrflat: "1",
            zipcode: "15-323",
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
            Address.remove({},function(err){
                if(err){
                    console.log(err)
                }else{
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
                                 var addr = new mongoose.Types.ObjectId(address._id);
                                 var newPhysio = {
                                firstname: seed.firstname,
                                lastname: seed.lastname,
                                pesel: seed.pesel,
                                nrpwz: seed.nrpwz,
                                address: addr
                                    }
                            Physiotherapist.create(newPhysio, function(err, physiotherapist)
                            {
                                if(err)
                                {
                                    console.log(err);
                                }else
                                {
                                   
                                physiotherapist.save();
                                  
                                        }
                                    });
                             }
                                
                        })
                     
                    }
                );
         
                }
            })
            }
    });
    Supervisor.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }else
        {
            SupervisorAddress.remove({},function(err){
                if(err){
                    console.log(err)
                }else{
                   console.log("Removed all the users!");
                    
                supervisordata.forEach(function(seed)
                {
                      var newAddress = {
                            streetname: seed.address.streetname,
                            nrblock: seed.address.nrblock,
                            nrflat: seed.address.nrflat,
                            zipcode: seed.address.zipcode,
                            town: seed.address.town
                        }
                     
                        SupervisorAddress.create(newAddress, function(err, address){
                             if(err){
                                 console.log(err);
                             }else{
                                    
                                 address.save();
                                 var addr = new mongoose.Types.ObjectId(address._id);
                                 var newPhysio = {
                                firstname: seed.firstname,
                                lastname: seed.lastname,
                                pesel: seed.pesel,
                                nrpwz: seed.nrpwz,
                                address: addr
                                    }
                            Supervisor.create(newPhysio, function(err, physiotherapist)
                            {
                                if(err)
                                {
                                    console.log(err);
                                }else
                                {
                                   
                                physiotherapist.save();
                                  
                                        }
                                    });
                             }
                                
                        })
                     
                    }
                );
         
                }
            })
            }
    });
}



module.exports = seedDB;