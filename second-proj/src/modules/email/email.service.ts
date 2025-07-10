import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {

    constructor(private readonly configService: ConfigService) { }
    emailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD')

            },

        })
        return transporter;
    }

    async sendEmail(dto: SendEmailDto) {
        const { recipients, subject, html } = dto;
        const transport = this.emailTransport();

        const options: nodemailer.SendMailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: recipients,
            subject: subject,
            html: html
        };
        try {
            await transport.sendMail(options);
            console.log('✅ Email sent successfully to:', recipients.join(', '));
        } catch (error) {
            console.error('❌ Failed to send email:', error.message || error);
            throw new Error('Email sending failed'); // Optional: rethrow to controller
        }

    }





}
