import { ApiProperty } from "@nestjs/swagger";

export class PostDataRequest {
    @ApiProperty({
        type: String,
        description: "Wiadomość do zapisania w pliku .txt na FTP"
    })
    message!: string;
}