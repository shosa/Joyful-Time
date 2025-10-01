import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Tutti i campi sono obbligatori.' }, { status: 400 });
    }

    // IMPORTANT: Configure your email provider details in environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO, // The email address that will receive the form submissions
      subject: `Nuovo messaggio dal sito Joyful Time da ${name}`,
      text: message,
      html: `<h1>Nuovo Messaggio da ${name}</h1><p>Email: ${email}</p><p>Messaggio:</p><p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Messaggio inviato con successo!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Si è verificato un errore durante l\'invio del messaggio.' }, { status: 500 });
  }
}
