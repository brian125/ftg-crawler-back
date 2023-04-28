import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class User extends Document {
    @Prop({required:true})
    name: string;
    
    @Prop({unique:true, required:true})
    email: string;
    
    @Prop({required:true, minlength: 4})
    password: string;
    
    @Prop({required:true})
    token: string;
    
    @Prop({required:true})
    role:string   
}

export const UserSchema = SchemaFactory.createForClass( User );