import ServicesProvider from "../model/model.js";

export const addServiceProvider = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, service, location, amountPerHour } = req.body;

    // Validation
    if (!firstName || !lastName || !mobileNumber || !service || !location || !amountPerHour) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new service provider entry
    const newProvider = new ServicesProvider({
      firstName,
      lastName,
      mobileNumber,
      service,
      location,
      amountPerHour,
    });

    // Save to database
    const savedProvider = await newProvider.save();

    res.status(201).json({ message: 'Service provider added successfully', data: savedProvider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
