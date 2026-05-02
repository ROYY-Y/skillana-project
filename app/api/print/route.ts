import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    // เปลี่ยนเป็น URL ที่ถูกต้องตามที่คุณใช้จริง
    await page.goto('http://localhost:3000/resume-export/components', {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();

    return new NextResponse(pdf as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume_skillana.pdf',
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}