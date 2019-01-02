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
    return result;
}

async function getAllQuarterbacks() {
    const qbs = await Quarterback.find();
    return qbs;
}

async function getQuarterback(id) {
    //filter by criteria
    const qb = await Quarterback.findById(id);
                                //   .limit(1)
                                //   .select( { firstName: 1, tags: 1} );
    return qb;
}

async function updateQuarterback(id, number, first, last, tags) {
    // const qb = await Quarterback.findById(id);
    // if (!qb) return;
    // qb.set({
    //     number: number,
    //     firstName: first,
    //     lastName: last,
    //     tags: tags
    // });
    // await qb.save();

    const qb = await Quarterback.findByIdAndUpdate(id, {
        $set: {
            number: number,
            firstName: first,
            lastName: last,
            tags: tags
        }
    });
}

async function removeQuarterback(id) {
    const qb = await Quarterback.findOneAndRemove(id);
}

getQuarterbacks().then(
    (qb) => {
        console.log(JSON.stringify(qb, undefined, 1));
    }
);

createQuarterback(8, 'Kirk', 'Cousins',  ['Quarterback', "Vikings"] )
    .then((newlyCreatedQb) => {
        updateQuarterback(newlyCreatedQb.id, 15, "Patrick", "Mahomes",  ["Chiefs", "Quarterback", "Kermit"])
    });

/**
        number: 12,
        firstName: 'Tom',
        lastName: 'Brady',
        tags: ['Quarterback', "New England", "Patriots"] 

        createQuarterback(12, 'Tom', 'Brady',  ['Quarterback', "New England", "Patriots"] );
        createQuarterback(10, 'Eli', 'Manning',  ['Quarterback', "New York", "Giants"] );
        createQuarterback(12, 'Aaron', 'Rodgers',  ['Quarterback', "Green Bay", "Packers"] );
 */