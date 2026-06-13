import ServiceProvider from '../models/Service.js'; // Importing ServiceProvider model

const resolvers = {
  Query: {
    getServiceProvidersByService: async (_, { service }) => {
      return await ServiceProvider.find({ service });
    },
  },
};

export default resolvers; // Exporting resolvers using ES module syntax