let makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

let typeDefs = `
type blogpost {
    id: String!
    title: String!
    thumbnail: String
    content: String
}

input blogpostInput {
    title: String!
    thumbnail: String
    content: String
}

type Query {
    blogposts(limit: Int): [blogpost]
    blogpost(id: String!): blogpost
}

type Mutation {
    addBlogpost(post: blogpostInput!): blogpost
}
`;

let getAllBlogposts = (obj, args, context, info) => {
    // the args object contains the GraphQL-parameters of the function

    // do database stuff
    const limitInput = args.limit || '10';
    const limit = parseInt(limitInput);

    const array = [];
    for (let i = 0; i < limit; i++) {
        array.push({
            id: i,
            title: 'Blogpost no. ' + i,
            content: 'Some boring content...',
            thumbnail: 'some url'
        });
    }
    return array;
};

let getBlogpost = (obj, args, context, info) => {
    // the args object contains the GraphQL-parameters of the function

    // do database stuff
    return {
        id: args.id,
        title: 'Blogpost no. ' + args.id,
        content: 'Some boring content...',
        thumbnail: 'some url'
    };
};

let addBlogpost = (obj, args, context, info) => {
    // the args object contains the GraphQL-parameters of the function

    // do database stuff
    return args.post;
};

let resolvers = {
    Query: {
        blogposts: getAllBlogposts,
        blogpost: getBlogpost
    },
    Mutation: {
        addBlogpost: addBlogpost
    }
};

module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
