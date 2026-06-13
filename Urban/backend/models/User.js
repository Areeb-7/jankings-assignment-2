import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'; // Import bcryptjs as the default export

const { hash, compare } = bcrypt; // Destructure the methods

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // role: {
  //   type: String,
  //   enum: ['customer', 'provider', 'admin'],
  //   default: 'customer'
  // },
  // phone: {
  //   type: String,
  //   required: true
  // },
  // address: {
  //   street: String,
  //   city: String,
  //   state: String,
  //   zipCode: String
  // },
  // address: {
  //   street: String,
  //   city: String,
  //   state: String,
  //   zipCode: String
  // }
},{timestamps:true});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return compare(candidatePassword, this.password);
};

export default model('User', userSchema);
