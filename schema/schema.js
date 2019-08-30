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



    // dummy book data  
    var books = [
        {
            name    : "book Name 1",
            genre   : "Fantacy",
            id      : "1",
            authorId: "1"
        },
        {
            name    : "book Name 2",
            genre   : "Fantacy",
            id      : "2",
            authorId: "2"

        },
        {
            name    : "book Name 3",
            genre   : "Fantacy",
            id      : "3",
            authorId: "3"

        },
        {
            name: "book Name 4",
            genre: "Fantacy",
            id: "4",
            authorId: "1"

        },
        {
            name: "book Name 5",
            genre: "Fantacy",
            id: "5",
            authorId: "2"

        }   
     ]
    // book shema 
    var authors  = [
            {name :"Lakshmi",age:25,id:"1"},
            {name :"Kanth",age:28,id:"2"},
            {name :"Raj",age:29,id:"3"},
        ]

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
                        return _.find(authors, { id: parent.authorId })
                    }
                } 
            })
        }
    );

const AuthorType = new GraphQLObjectType({
    name  : "Author",
    fields: ()=>({
      name: { type : GraphQLString },
      age : { type : GraphQLInt },
      id  : { type: GraphQLID },
      books : {
          type: new GraphQLList(BookType),
          resolve( parent,args){
            return _.filter(books,{authorId:parent.id})
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
                return _.find(books,{id: args.id});
            },
            author: {
                type: AuthorType,
                args: { id: { type: GraphQLID } },
                resolve(parent, args) {
                    return _.find(authors, { id: args.id })
                }
            } 
        },
        author :{
            type : AuthorType,
            args : { id : {type : GraphQLID}},
            resolve( parent, args){
                return _.find(authors,{id : args.id })
            },
            books : {
                type : new GraphQLList(BookType),
                resolve( parent,args){
                    return _.filter(books,{authorId : args.id})
                }
            }
        },
        books : {
            type : new GraphQLList (BookType),
            resolve( parent,args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }

         
             
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
    