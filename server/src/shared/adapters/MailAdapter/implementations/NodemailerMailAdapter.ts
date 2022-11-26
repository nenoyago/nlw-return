import nodemailer, { Transporter } from 'nodemailer';
import { IMailAdapter, ISendMailData } from '../IMailAdapter';

export class NodemailerMailAdapter implements IMailAdapter {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'ebfec0ae04badc',
        pass: '440a7c3a4c11c1',
      },
    });
  }

  async sendMail({ body, subject }: ISendMailData): Promise<void> {
    this.client.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Yago Neno <developer.neno@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}
