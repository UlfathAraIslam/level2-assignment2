// import { Schema, model, connect } from 'mongoose';

export type FullName=  {
    firstName: string;
    lastName: string;
  }
export type Address = {
    street: string;
    city: string;
    country: string;
  }
export type Order = {
    productName: string;
    price: number;
    quantity: number;
  }
  

export type User = {
    userId: number;
    username: string;
    password: string; // Assuming you won't expose the hashed password in the user object
    fullName:FullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address:Address;
    order: Array<Order>;
  }