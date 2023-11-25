import { Schema, model} from 'mongoose';
import { Address, FullName, Order, User } from './user/user.interface';

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

  const User = model<User>('User', userSchema)