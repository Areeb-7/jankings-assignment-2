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
