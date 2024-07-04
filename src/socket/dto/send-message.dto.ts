import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SendMessageDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    content: string
    
    roomId: number
}