const itemModel = require('../model/dataModel');
const mongoose = require("mongoose");

function sayHii(req, res){
    return res.json({msg : 'Hii'});
}

async function handleLogIN(req, res) {
    const userKey = req.body.key;
    const KEY = '44445555';
    if (userKey != KEY) {
        return res.json({ msg: 'fail' });
    } else {
        return res.json({ msg: 'success' });
    }
}

async function updateActiveStatus(req, res) {    
    if (req.body) {
        const activeStatus = req.body.activeStatus;
        const isActiveExits = await itemModel.findOne({ itemName: 'activeStatus' });
        let DBres;
        if (isActiveExits) {
            DBres = await itemModel.findOneAndReplace(
                { itemName: 'activeStatus' },
                { itemName: 'activeStatus', itemValue: activeStatus },
                { new: true },
            );
        } else {
            DBres = await itemModel.create({
                itemName: 'activeStatus',
                itemValue: activeStatus,
            });
        }
        //console.log("DBres:", DBres);
        return res.json({msg : 'Active status updated'});
    }else{
        //console.log("Error at controler@321");
        return res.json({msg : 'Active status not updated'});
    }
}

async function isActive(req, res) {
    let DBres;
    DBres = await itemModel.findOne({
        itemName: 'activeStatus',
    })
    if (!DBres) {
        console.log("Error in data");
        return res.json({ msg: 'error' })
    } else {
        //console.log("DBres.itemValue:", DBres.itemValue);
        if (DBres.itemValue == 'active') {
            return res.json({ msg: 'active' });
        } else {
            return res.json({ msg: 'notActive' });
        }
    }
}

async function updateURL(req, res) {
    if (req.body) {
        const URL = req.body.url;
        const isURLExits = await itemModel.findOne({ itemName: 'url' });
        let DBres;
        if (isURLExits) {
            DBres = await itemModel.findOneAndReplace(
                { itemName: 'url' },
                { itemName: 'url', itemValue: URL },
                { new: true },
            );
        } else {
            DBres = await itemModel.create({
                itemName: 'url',
                itemValue: URL,
            });
        }
        //console.log("DBres:", DBres);
        return res.json({msg : 'URL updated'});
    }
}

async function getUrl(req, res) {
    let DBres;
    DBres = await itemModel.findOne({
        itemName: 'url',
    })
    if (!DBres) {
        console.log("Error in data");
        return res.json({ msg: 'error' })
    } else {
        //console.log("DBres.itemValue:", DBres.itemValue);
        return res.json({ msg: DBres.itemValue });
    }
}

module.exports = {
    handleLogIN,
    updateActiveStatus,
    isActive,
    updateURL,
    getUrl,
    sayHii,
}