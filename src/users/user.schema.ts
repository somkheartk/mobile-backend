import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required:true})
  image_path:string;
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({required:true})
  username:string;
  
  @Prop({required:true})
  password : string ;

  @Prop({ required: true })
  date_of_birth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

