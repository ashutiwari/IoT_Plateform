const express = require('express');
//Requiring express router
const router = express.Router();

const Data = require('../models/model_data'); // Requiruing model for data
const Device = require('../models/model_device'); // Requiruing model for data

router.get("/", (req, res) => {
    Data.getAllData((err, data) => { //function to get the list of all data, 
        //only admins will have the permission to run this.
        if (err)
            res.json({
                success: false,
                msg: err
            });
        else {
            res.json({
                success: true,
                msg: data
            });
        }
    });

});

router.post('/', (req, res) => {
    //checking request body:
    if (!req.body.deviceID || !req.body.data) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Device.getDevicesById(req.body.deviceID, (err, reqDevice) => {
        if (err) {
            res.json({
                success: false,
                msg: err,
            });
        }
        else {
            if (!reqDevice) {
                res.json({
                    success: false,
                    msg: "Invalid Device.!"
                });
            }
            else {
                console.log(reqDevice);

                let DaTa = {
                    deviceID: reqDevice._id,
                    data: req.body.data
                }

                //To add devices:
                Data.addData(DaTa, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err,
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            msg: "Data Successfully Added.!"
                        });
                    }
                });
            }
        }
    });

});



//Method to get data by Device ID;

router.post('/dataByDeviceId', (req, res) => {
    //checking request body:
    if (!req.body.deviceID) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Device.getDevicesById(req.body.deviceID, (err, reqDevice) => {
        if (err) {
            res.json({
                success: false,
                msg: err,
            });
        }
        else {
            if (!reqDevice) {
                res.json({
                    success: false,
                    msg: "Invalid Device.!"
                });
            }
            else {


                //To get data:
                Data.getDataByDeviceID(reqDevice._id, (err,DaTa) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err,
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            msg: DaTa
                        });
                    }
                });
            }
        }
    });

});


//Exporting the router as a Module
module.exports = router;