import mongoose from 'mongoose';

const servicesProviderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    service: { type: String, required: true },
    location: { type: String, required: true },
    amountPerHour: { type: Number, required: true },
  },
  { timestamps: true }
);

const ServicesProvider = mongoose.model('ServicesProvider', servicesProviderSchema);

export default ServicesProvider;



// import { Schema, model } from 'mongoose';

// const serviceSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: ['cleaning', 'plumbing', 'electrical', 'carpentry', 'painting', 'appliance_repair']
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   price: {
//     base: {
//       type: Number,
//       required: true
//     },
//     unit: {
//       type: String,
//       enum: ['per_hour', 'per_visit', 'per_sqft'],
//       default: 'per_visit'
//     }
//   },
//   imageUrl: String,
//   duration: {
//     type: Number, // in minutes
//     required: true
//   },
//   available: {
//     type: Boolean,
//     default: true
//   }
// });

// export default model('Service', serviceSchema);