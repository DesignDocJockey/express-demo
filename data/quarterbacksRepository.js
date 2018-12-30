'use strict';

const mongoose = require('mongoose');
//const config = require('config');

mongoose.connect('mongodb://localhost/players')
    .then( () => console.log(`Connected to MongoDB Instance`) )
    .catch( err => console.error(`Could not connect to MongoDB Instance`, err));

//schema defines the structure of the MongoDB documents i.e. properties & fields
const quarterbackSchema = new mongoose.Schema({
    number: Number,
    firstName: String,
    lastName: String,
    date: { type: Date, default: Date.now},
    tags: [String]
});

const Quarterback = mongoose.model('Quarterback', quarterbackSchema);

async function createQuarterback(jerseyNumber, firstName, lastName, tags) {
    const quarterback = new Quarterback({
        number: jerseyNumber,
        firstName: firstName,
        lastName: lastName,
        tags: tags
    });
    const result = await quarterback.save();
    console.log(result);
}

async function getQuarterbacks() {
    //retreives all
    //const qbs = await Quarterback.find();
    
    //filter by criteria
    const qbs = await Quarterback.find( { firstName: "Tom"} )
                                  .limit(1)
                                  .select( { firstName: 1, tags: 1} );
    return qbs;
}

getQuarterbacks().then(
    (qb) => {
        console.log(JSON.stringify(qb, undefined, 1));
    }
);

//createQuarterback(12, 'Aaron', 'Rodgers',  ['Quarterback', "Green Bay", "Packers"] );

/**
        number: 12,
        firstName: 'Tom',
        lastName: 'Brady',
        tags: ['Quarterback', "New England", "Patriots"] 

        createQuarterback(12, 'Tom', 'Brady',  ['Quarterback', "New England", "Patriots"] );
        createQuarterback(10, 'Eli', 'Manning',  ['Quarterback', "New York", "Giants"] );
        createQuarterback(12, 'Aaron', 'Rodgers',  ['Quarterback', "Green Bay", "Packers"] );
 */