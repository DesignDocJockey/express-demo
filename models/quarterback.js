'use strict';

const mongoose = require('mongoose');

//with no default id created
// const quarterbackSchema = new mongoose.Schema({
//     number: Number,
//     firstName: String,
//     lastName: String,
//     date: { type: Date, default: Date.now},
//     tags: [String]
// }, {_id: false});

const qbModelName = "Quarterback";
const quarterbackSchema = new mongoose.Schema({
    number: Number,
    firstName: String,
    lastName: String,
    dob: { type: Date },
    weight: Number,
    college: String,
    createdOn: { type: Date, default: Date.now},
    teams: [String]
});

module.exports = mongoose.model(qbModelName, quarterbackSchema) ;