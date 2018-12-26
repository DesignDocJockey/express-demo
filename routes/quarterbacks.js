const Joi = require('Joi');
const express = require('express');
const router = express.Router();

let QuarterBacks = require('../data/mockQuarterbackData')['QuarterBacks'];

//define our Joi schema to specify validation rules on input parameters
const getJOISchema = () => {
    const schema = {
        number: Joi.number().positive().min(0).max(19).integer().required(),
        firstName: Joi.string().min(3).regex( new RegExp("^[a-zA-Z]+$")).required(),
        lastName: Joi.string().min(3).regex(new RegExp("^[a-zA-Z]+$")).required()
    };
    return schema;
};

router.get('/', (request, response) => {
    const data = QuarterBacks;
    response.send(data);
});

router.get('/:id', (request, response) => {
    const data = QuarterBacks.find(qb => qb.id === parseInt(request.params.id));
    
    if(!data) {
        return response.status(404).send(`Quarterback for Given Id: ${request.params.id} was not found`);
    }
    response.send(data);
});

router.post('/', (request, response) => {
    const { error} = Joi.validate(request.body, getJOISchema());
    if (error) {
        return response.status(400).send(error);
    }

    const newqb = {
            id: QuarterBacks.length + 1,
            number: request.body.number,
            firstName: request.body.firstName,
            lastName:  request.body.lastName
        };

    QuarterBacks.push(newqb);
    response.status(200).send(newqb);
});

router.put('/:id',  (request, response) => {
    const data = QuarterBacks.find(qb => qb.id === parseInt(request.params.id));
    if(!data) {
        return response.status(404).send(`Quarterback for Given Id: ${request.params.id} was not found`);
    }

    const { error } = Joi.validate(request.body, getJOISchema());
    if (error) {
        return response.status(400).send(error);
    }

    data.number = request.body.number;
    data.firstName = request.body.firstName;
    data.lastName =  request.body.lastName;

    response.status(200).send(data);
});

router.delete('/:id',  (request, response) => {
    const qb = QuarterBacks.find(qb => qb.id === parseInt(request.params.id));
    if(!qb) {
        return response.status(404).send(`Quarterback for Given Id: ${request.params.id} was not found`);
    }

    const index = QuarterBacks.indexOf(qb);
    QuarterBacks.slice(qb, 1);
    response.status(200).send(qb);
});

module.exports = router;