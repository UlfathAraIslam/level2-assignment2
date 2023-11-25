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
            _id: 0,
          },
        },
      ]);
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB

}