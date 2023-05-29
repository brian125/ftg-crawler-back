import { IsNotEmpty, IsString } from "class-validator";

export class CreateHostDto {

    @IsString()
    @IsNotEmpty()
    universityName: string;

    @IsString()
    @IsNotEmpty()
    hostUrl: string;

}