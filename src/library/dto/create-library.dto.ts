import {IsDate, IsNotEmpty, IsNumber, IsObject, IsString, MinLength } from "class-validator";

export class CreateLibraryDto {
    @IsString()
    @MinLength(1)
    nameU: String;

    @IsObject()
  records: {
    author: String;
    detail: String;
    rank: Number;
    title: String;
  };

  @IsNumber()
  totalRecords: Number;

  @IsString()
  @MinLength(1)
  universidad: String;

  @IsString()
  @MinLength(1)
  url: String;

  @IsDate()
  date: Date;

}