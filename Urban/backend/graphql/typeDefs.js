import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type ServiceProvider {
    id: ID!
    firstName: String!
    lastName: String!
    mobileNumber: String!
    service: String!
    location: String!
    amountPerHour: Float!
  }

  type Query {
    getServiceProvidersByService(service: String!): [ServiceProvider!]!
  }
`;

export default typeDefs;
