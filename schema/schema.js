const graphql = require('graphql');
const _       = require('lodash');
const  {
        GraphQLObjectType,
        GraphQLString,
        GraphQLList,
        GraphQLInt,
        GraphQLID,
        GraphQLNonNull,
        GraphQLSchema
    }  = graphql;


const Book        = require('../models/Book');
const Author      = require('../models/Author');


const BookType = new GraphQLObjectType(
        {
            name  : "Book",
            fields: ()=> ({
                name    : { type: GraphQLString},
                genre   : { type: GraphQLString},
                id      : { type: GraphQLID},
                authorId: { type: GraphQLString},
                author  : {
                    type: AuthorType,
                    args: { id: { type: GraphQLID } },
                    resolve(parent, args) {
                        // return _.find(authorId, { id: parent.authorId })
                        console.log({ _id: parent.authorId });
                        return Author.findById({ _id: parent.authorId})
                    }
                } 
            })
        }
    );

const AuthorType = new GraphQLObjectType({
    name  : "Author",
    fields: ()=>({
      name : { type : GraphQLString },
      age  : { type : GraphQLInt },
      id   : { type: GraphQLID },
      books: {
          type: new GraphQLList(BookType),
          resolve( parent,args){
              console.log(parent);
            // return _.filter(books,{authorId:parent.id})
              return Book.find({ authorId: parent._id })
          }
      }
    })
});

const RootQuery = new GraphQLObjectType({
    name  : 'RootQueryType',
    fields: {
        book : {
            type: BookType,
            args: { 
                id : {
                     type: GraphQLString
                }
            },
            resolve( parent , args){
                // return _.find(books,{id: args.id});
                return Book.findById({ _id: args.id });

            },
            author: {
                type: AuthorType,
                args: { id: { type: GraphQLID } },
                resolve(parent, args) {
                    //return _.find(authors, { id: args.id })
                  console.log(parent);
                    return Author.findById({ _id: args.id })

                }
            } 
        },
        author :{
            type: AuthorType,
            args: { id : {type : GraphQLID}},
            resolve( parent, args){
                // return _.find(authors,{id : args.id })
                return Author.findById({ _id: args.id })

            },
            books : {
                type: new GraphQLList(BookType),
                resolve( parent,args){
                    
                    return Book.find({ authorId: args.id })

                }
            }
        },
        books : {
            type: new GraphQLList (BookType),
            resolve( parent,args){
                 return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        }

         
             
    }
});


const Mutation = new GraphQLObjectType({
    name                   : 'Mutation',
    fields                 : {
            addAuthor          : {
                    type           : AuthorType,
                    args           : {
                        name       : { type: GraphQLString },
                        age        : { type: GraphQLInt }
                    },
                    resolve( parent,args){
                        let author = Author({
                            name   : args.name,
                            age    : args.age,
                        });
                       return author.save(); 
                    }
            }        
    }
});


module.exports = new GraphQLSchema({
    query   : RootQuery,
    mutation: Mutation
})
    