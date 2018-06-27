const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNotNull
} = require('graphql');

// Hardcoded Data
const customers = [
    {id: '1', name: 'Sivar Sarkawt', email: 'sivar.sarkawt@engineer.com', age: 23},
    {id: '2', name: 'Sivan Sarkawt', email: 'sivan@example.com', age: 21},
    {id: '3', name: 'Savan Sarkawt', email: 'savan@example.com', age: 14}
];

// Customer Type
const CustomerType = new GraphQLObjectType({
    name:'customer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type:GraphQLInt}
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id = args.id){
                        return customers[i];
                    }
                }
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});