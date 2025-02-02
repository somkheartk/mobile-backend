import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
) {}

  // เพิ่มผู้ใช้ใหม่
   async createUser(createUserDto: { name: string; email: string; address: string; phone: string; date_of_birth: Date }) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }); // เพิ่ม await ตรงนี้
    console.log(user);
    return user ?? undefined;
  }
  
  async getAllUsers() {
    return this.userModel.find().exec();
  }
  async getPaginatedUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(),
    ]);

    return {
      data: users,
      pagination: {
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }


}
