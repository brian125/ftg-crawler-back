import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Host extends Document {
    @Prop({required:true})
    universityName: string;
    
    @Prop({required:true})
    hostUrl: string;
}

export const HostSchema = SchemaFactory.createForClass( Host );