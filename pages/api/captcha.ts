import { NextApiRequest, NextApiResponse } from 'next'

export default async function Contact(req: NextApiRequest, res: NextApiResponse) {
  const { captcha } = req.body;
    async function validateCaptcha(captcha) {
        console.log('captcha', captcha);
        return true;
    }

  console.log('captcha', captcha);
  const validCaptcha = await validateCaptcha(captcha);

  if (!validCaptcha) {
    return res.status(422).json({
      error: "Unprocessable request, Invalid captcha code.",
    });
  }
};