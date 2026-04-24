import puppeteer from "puppeteer";
import { Request, Response } from "express";

export const generatePDF = async (req: Request, res: Response) => {
  try {
    const { content, name, mobile } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`
      <html>
        <body style="font-family: Noto Sans Devanagari, Arial; padding: 40px;">
          
          <div style="text-align:center;">
            <h2>कार्यालय</h2>
            <p>जन शिकायत प्रकोष्ठ</p>
            <hr/>
          </div>

          <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.8;">
            ${content}
          </div>

         

        </body>
      </html>
    `);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=letter.pdf",
    });

    res.send(pdf);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
};