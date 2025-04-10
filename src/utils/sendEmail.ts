import transporter from "../shared/email";

async function sendEmail({ to, subject, html, text }: { to: string, subject: string, html: string, text: string }) {
    try {
      // Using template literals for the 'from' address
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html,
      });
  
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      // Re-throw the error to be handled by the caller
      throw error;
    }
  }

export default sendEmail;
