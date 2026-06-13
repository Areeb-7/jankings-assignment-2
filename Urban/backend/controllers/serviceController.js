import Service from '../models/Service.js';

export const addServiceProvider = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, service, location, amountPerHour } = req.body;

    // Validation
    if (!firstName || !lastName || !mobileNumber || !service || !location || !amountPerHour) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new service provider entry
    const newProvider = new Service({
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

export const getServiceProvider = async (req, res) => {
  const { service } = req.params;

  try {
    // Find service providers matching the specified service
    const providers = await Service.find({ service });

    if (providers.length === 0) {
      return res.status(404).json({ message: "No service providers found for the specified service." });
    }

    res.status(200).json(providers);
  } catch (error) {
    console.error("Error fetching service providers:", error);
    res.status(500).json({ message: "An error occurred while fetching service providers.", error });
  }
};

// import Service from '../models/Service.js'; // Only import the model, no need for destructuring

// export async function createService(req, res) {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const service = new Service(req.body);
//     await service.save();
//     res.status(201).json(service);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// export async function getAllServices(req, res) {
//   try {
//     const services = await Service.find({ available: true }); // Use Service.find directly
//     res.json(services);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// export async function getServiceById(req, res) {
//   try {
//     const service = await Service.findById(req.params.id); // Use Service.findById directly
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// export async function updateService(req, res) {
//   try {
//     const service = await Service.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // Option to return the updated document
//     );
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }
