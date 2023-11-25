import { UserModel } from "../user.model";
import { User } from "./user.interface";


const createUserIntoDB = async(user: User)=> {
    const result = await UserModel.create(user)
    return result;
};

const getAllUsersFromDB = async () => {
    const result = await UserModel.aggregate([
        { $match: {} },
        {
            $addFields: {
                "fullName._id": "$$REMOVE",
                "address._id": "$$REMOVE"
            }
        },
        {
          $project: {
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            address: 1,
          },
        },
      ]);
    return result;
}

const getSingleUserFromDB = async (id: string) => {
    const result = await UserModel.findOne({ id: id});
    console.log(result);
    return result;

}

const updateUserInDB = async (id: number, updatedData: User) => {
    const result = await UserModel.findOneAndUpdate(
        { id: id },
        { $set: updatedData }, 
        { new: true }
    );

    console.log(result);
    return result;
}

const deleteUserFromDB = async (id: number) => {
    const result = await UserModel.findOneAndDelete({ id: id });
    return result;
}



export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserInDB,
    deleteUserFromDB,
    

}