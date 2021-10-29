import { Injectable } from "@nestjs/common";
import { MailService } from "src/mail/mail.service";
import { MessageToAdminDto } from "./contact.dto";

@Injectable()
export class ContactService{
    constructor(private mailService: MailService) {}
    async postMessage(messageToAdminDto : MessageToAdminDto){
        try{
            await this.mailService.sendMessageToAdmin(messageToAdminDto);
        }catch(err){
            console.log(err);
        }
       
    }
    
}