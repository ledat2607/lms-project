export function EmailTemplate({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="background-color: #0ea5e9; color: #fff; padding: 20px; border-radius: 8px 8px 0 0;">
      <h2>${title}</h2>
    </div>
    <div style="padding: 16px;">
      <p>${content}</p>
      <p>Trân trọng,<br/>LMS Support Team</p>
    </div>
    <div style="font-size: 12px; background: #f1f1f1; text-align: center; padding: 10px; border-radius: 0 0 8px 8px;">
      © ${new Date().getFullYear()} LMS. All rights reserved.
    </div>
  </div>`;
}
