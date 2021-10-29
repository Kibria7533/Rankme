import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MessageToAdminDto } from "./contact.dto";
import { ContactService } from "./contact.service";

@ApiTags('Contact Us')
@Controller()
export class ContactController{
    constructor(private contactService : ContactService){}

@Post('api/v1/message')
postMessage(@Body() messageToAdminDto: MessageToAdminDto ){
    this.contactService.postMessage(messageToAdminDto);
    return 'Mail has been sent';
}


}