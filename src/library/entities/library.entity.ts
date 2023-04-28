import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Library extends Document {
  nameU: String;
  records: {
    author: String;
    detail: String;
    rank: Number;
    title: String;
  };
  totalRecords: Number;
  universidad: String;
  url: String;
  date: Date;
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
