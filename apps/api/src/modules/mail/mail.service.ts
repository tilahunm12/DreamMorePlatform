import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly configService: ConfigService) {
    this.initTransporter();
  }

  private initTransporter() {
    const host = this.configService.get<string>('SMTP_HOST') || process.env.SMTP_HOST;
    const port = parseInt(this.configService.get<string>('SMTP_PORT') || process.env.SMTP_PORT || '587', 10);
    const user = this.configService.get<string>('SMTP_USER') || process.env.SMTP_USER;
    const rawPass = this.configService.get<string>('SMTP_PASS') || process.env.SMTP_PASS;
    const pass = rawPass ? rawPass.replace(/\s+/g, '') : undefined;

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        host: host || 'smtp.gmail.com',
        port,
        secure: port === 465,
        auth: {
          user: user.trim(),
          pass,
        },
      });
      this.logger.log(`📧 SMTP Transporter initialized successfully for user: ${user}`);
    } else {
      this.logger.warn(
        '⚠️ SMTP_USER / SMTP_PASS not set in environment. Outgoing emails will be logged in console as preview mode.',
      );
    }
  }

  /**
   * 1. የእንኳን ደህና መጡ መልእክት (Send Branded Welcome Email)
   */
  async sendWelcomeEmail(to: string, name: string, role: string): Promise<boolean> {
    const roleLabels: Record<string, { title: string; desc: string; link: string; btn: string }> = {
      STUDENT: {
        title: 'ተማሪ (Student)',
        desc: 'በሺዎች የሚቆጠሩ ኮርሶችን መማር ይጀምሩ፤ እውቀትዎን ያሳድጉ እንዲሁም በቴሌብር እና በኢትዮጵያ ባንኮች በቀላሉ ክፍያዎችን ይፈጽሙ።',
        link: 'https://dream-more-platform-web.vercel.app/dashboard/student',
        btn: 'ወደ ተማሪ ዳሽቦርድ ይሂዱ',
      },
      TEACHER: {
        title: 'መምህር / አሰልጣኝ (Instructor)',
        desc: 'እውቀትዎን በቪዲዮ እና በስልጠና ለኢትዮጵያ ወጣቶች ያካፍሉ፤ የራስዎን ኮርሶች ፈጥረው ገቢዎን ያሳድጉ።',
        link: 'https://dream-more-platform-web.vercel.app/dashboard/teacher',
        btn: 'ወደ መምህር ዳሽቦርድ ይሂዱ',
      },
      EMPLOYER: {
        title: 'አሰሪ / ቀጣሪ (Employer)',
        desc: 'በ AppWorks የሥራ ገበያ ላይ አዳዲስ ፕሮጀክቶችን ይለጥፉ፤ ብቁ የሀገር ውስጥ ፍሪላንሰሮችን በቴሌብር እና በባንክ የክፍያ ዋስትና (Escrow) ይቅጠሩ።',
        link: 'https://dream-more-platform-web.vercel.app/dashboard/employer',
        btn: 'ወደ አሰሪ ዳሽቦርድ ይሂዱ',
      },
      FREELANCER: {
        title: 'ፍሪላንሰር (Freelancer)',
        desc: 'በ AppWorks ላይ አዳዲስ የስራ እድሎችን ያግኙ፤ ፕሮፖዛል ያስገቡ እንዲሁም ስራዎችን አጠናቀው ክፍያዎን በቀጥታ በቴሌብር ይቀበሉ።',
        link: 'https://dream-more-platform-web.vercel.app/dashboard/freelancer',
        btn: 'ወደ ፍሪላንሰር ዳሽቦርድ ይሂዱ',
      },
      ADMIN: {
        title: 'አስተዳዳሪ (Administrator)',
        desc: 'የ Dream More ፕላትፎርም ስርዓትን፣ ክፍያዎችንና የተጠቃሚዎችን እንቅስቃሴ ያስተዳድሩ።',
        link: 'https://dream-more-platform-web.vercel.app/dashboard/admin',
        btn: 'ወደ አድሚን ዳሽቦርድ ይሂዱ',
      },
    };

    const roleInfo = roleLabels[role] || roleLabels.STUDENT;

    const htmlContent = `
<!DOCTYPE html>
<html lang="am">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>እንኳን ወደ Dream More በደህና መጡ!</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0b1120;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
    }
    .wrapper {
      width: 100%;
      background-color: #0b1120;
      padding: 40px 15px;
      box-sizing: border-box;
    }
    .card {
      max-width: 580px;
      margin: 0 auto;
      background-color: #131c31;
      border: 1px solid #1e293b;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      padding: 35px 30px;
      text-align: center;
      border-bottom: 2px solid #f97316;
    }
    .brand-title {
      color: #ffffff;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-title span {
      color: #f97316;
    }
    .brand-tagline {
      color: #94a3b8;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 5px;
      font-weight: 600;
    }
    .content {
      padding: 35px 30px;
    }
    .welcome-badge {
      display: inline-block;
      padding: 6px 14px;
      background-color: rgba(249, 115, 22, 0.15);
      border: 1px solid rgba(249, 115, 22, 0.3);
      color: #fb923c;
      font-size: 12px;
      font-weight: bold;
      border-radius: 50px;
      margin-bottom: 15px;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 15px 0;
    }
    p {
      font-size: 14px;
      line-height: 1.6;
      color: #cbd5e1;
      margin: 0 0 18px 0;
    }
    .role-box {
      background-color: #0b1120;
      border: 1px solid #1e293b;
      border-radius: 14px;
      padding: 18px 20px;
      margin: 25px 0;
    }
    .role-title {
      color: #f97316;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .role-desc {
      color: #94a3b8;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
    .btn-container {
      text-align: center;
      margin: 30px 0 20px 0;
    }
    .btn {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3);
    }
    .features {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #1e293b;
    }
    .feature-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .feature-dot {
      color: #10b981;
      margin-right: 8px;
      font-weight: bold;
    }
    .footer {
      background-color: #0b1120;
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid #1e293b;
      font-size: 11px;
      color: #64748b;
      line-height: 1.6;
    }
    .footer a {
      color: #f97316;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="brand-title">Dream<span>More</span></div>
        <div class="brand-tagline">Right work at right time • ኢትዮጵያ</div>
      </div>
      
      <div class="content">
        <div class="welcome-badge">🎉 እንኳን በደህና መጡ!</div>
        <h1>ሰላም ${name || 'የDream More ቤተሰብ'}፣</h1>
        
        <p>
          ወደ <strong>Dream More Platform</strong> በደህና መጡ! አካውንትዎ በተሳካ ሁኔታ ተፈጥሮ ለአገልግሎት ዝግጁ ሆኗል።
        </p>

        <div class="role-box">
          <div class="role-title">የተመዘገቡበት ሚና፡ ${roleInfo.title}</div>
          <div class="role-desc">${roleInfo.desc}</div>
        </div>

        <div class="btn-container">
          <a href="${roleInfo.link}" class="btn" target="_blank">${roleInfo.btn} &rarr;</a>
        </div>

        <div class="features">
          <div class="feature-item">
            <span class="feature-dot">&#10003;</span> በቴሌብር (Telebirr) እና በኢትዮጵያ ንግድ ባንክ (CBE) የሚፈጸም ፈጣን ክፍያ
          </div>
          <div class="feature-item">
            <span class="feature-dot">&#10003;</span> በ QR Code የተረጋገጡ ዲጂታል ሰርተፊኬቶች
          </div>
          <div class="feature-item">
            <span class="feature-dot">&#10003;</span> በ AppWorks በኩል አስተማማኝ የፍሪላንስ ስራዎች እና የኤስክሮው (Escrow) ዋስትና
          </div>
        </div>
      </div>

      <div class="footer">
        <p>ይህ አውቶማቲክ መልእክት የተላከው ከ Dream More Platform ነው።</p>
        <p>&copy; ${new Date().getFullYear()} Dream More Platform. All rights reserved. Addis Ababa, Ethiopia.</p>
        <p><a href="https://dream-more-platform-web.vercel.app">dream-more-platform-web.vercel.app</a></p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const userEmail = this.configService.get<string>('SMTP_USER') || process.env.SMTP_USER;
    const mailOptions = {
      from: this.configService.get<string>('SMTP_FROM') || process.env.SMTP_FROM || (userEmail ? `"Dream More Platform" <${userEmail}>` : '"Dream More Platform" <noreply@dreammore.com>'),
      to,
      subject: `🎉 እንኳን ወደ Dream More Platform በደህና መጡ፣ ${name || 'ተጠቃሚ'}!`,
      html: htmlContent,
    };

    if (this.transporter) {
      try {
        const info = await this.transporter.sendMail(mailOptions);
        this.logger.log(`✅ [EMAIL SENT] Branded Welcome Email delivered to: ${to} (Message ID: ${info.messageId})`);
        return true;
      } catch (err: any) {
        this.logger.error(`❌ [EMAIL ERROR] Failed to send email to ${to}: ${err.message}`);
        return false;
      }
    } else {
      this.logger.log(`📨 [EMAIL PREVIEW (NO SMTP CONFIGURED)] Dispatching to ${to} (${name}):\nSubject: ${mailOptions.subject}`);
      return true;
    }
  }

  /**
   * 2. የክፍያ ማረጋገጫ ደረሰኝ ኢሜይል (Payment Receipt Email)
   */
  async sendPaymentApprovedEmail(to: string, name: string, courseTitle: string, amount: string, txnId: string): Promise<boolean> {
    const htmlContent = `
<!DOCTYPE html>
<html lang="am">
<head>
  <meta charset="UTF-8">
  <title>የክፍያ ማረጋገጫ ደረሰኝ - Dream More</title>
</head>
<body style="background-color: #0b1120; font-family: sans-serif; color: #e2e8f0; padding: 30px 10px;">
  <div style="max-width: 540px; margin: 0 auto; background: #131c31; border-radius: 16px; border: 1px solid #1e293b; padding: 30px;">
    <h2 style="color: #f97316; margin-top: 0;">DreamMore Platform</h2>
    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 12px; color: #10b981; font-weight: bold; margin-bottom: 20px;">
      ✓ ክፍያዎ በተሳካ ሁኔታ ጸድቋል!
    </div>
    <p>ሰላም <strong>${name}</strong>፣</p>
    <p>ለ <strong>${courseTitle}</strong> የፈጸሙት ክፍያ ተረጋግጦ ኮርሱ በሙሉ ክፍት ሆኖልዎታል።</p>
    <div style="background: #0b1120; padding: 15px; border-radius: 10px; font-size: 13px; line-height: 1.8; margin: 20px 0;">
      <div>የኮርሱ ስም፡ <strong>${courseTitle}</strong></div>
      <div>የተከፈለው መጠን፡ <strong style="color: #f97316;">${amount}</strong></div>
      <div>የማመሳከሪያ ቁጥር (Txn ID)፡ <strong>${txnId}</strong></div>
    </div>
    <div style="text-align: center; margin: 25px 0;">
      <a href="https://dream-more-platform-web.vercel.app/dashboard/student" style="background: #f97316; color: white; padding: 12px 28px; text-decoration: none; border-radius: 10px; font-weight: bold;">ኮርሱን መከታተል ጀምር &rarr;</a>
    </div>
  </div>
</body>
</html>
    `;

    const userEmail = this.configService.get<string>('SMTP_USER') || process.env.SMTP_USER;
    const mailOptions = {
      from: this.configService.get<string>('SMTP_FROM') || process.env.SMTP_FROM || (userEmail ? `"Dream More Platform" <${userEmail}>` : '"Dream More Platform" <noreply@dreammore.com>'),
      to,
      subject: `✓ የክፍያ ማረጋገጫ፡ የ${courseTitle} ኮርስ ክፍት ሆኗል!`,
      html: htmlContent,
    };

    if (this.transporter) {
      try {
        await this.transporter.sendMail(mailOptions);
        return true;
      } catch (err) {
        return false;
      }
    }
    return true;
  }
}
