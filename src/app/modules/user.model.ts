import { Schema, model} from 'mongoose';
import { Address, FullName, Order, User } from './user/user.interface';
import bcrypt from "bcrypt";

const userFullNameSchema = new Schema<FullName>({
        firstName: { type: String},
        lastName: { type: String},
})
const userAddressSchema = new Schema<Address>({
    street: { type: String},
    city: { type: String},
    country: { type: String},
})

const userOrderSchema = new Schema<Order>({
    productName: {type: String},
    price: { type: Number},
    quantity: { type: Number},
})

const userSchema = new Schema<User>({
    userId: { type: Number},
    username: {type: String},
    password: { type: String},
    fullName: userFullNameSchema,
    age: { type: Number},
    email: { type: String},
    isActive: { type: Boolean},
    hobbies: { type: [String]},
    address: userAddressSchema ,
    order: [userOrderSchema],
  });

  // hash password :
  userSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
      }
      next();
    } catch (error) {
      next();
    }
  });
  
  // remove password with post hook:
  userSchema.post("save", async function (doc, next) {
    doc.password = "";
    next();
  });

  userSchema.methods.toJSON = function () {
    const userObject= this.toObject();
    delete userObject.password;
    return userObject;
  };



  export const UserModel = model<User>('User', userSchema)