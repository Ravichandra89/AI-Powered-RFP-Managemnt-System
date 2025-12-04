import nodemailer from "nodemailer";
import { rfpDocument } from "../models/RFP.model";
import { VendorDocument } from "../models/Vendor.model";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  },
});

export const verifyEmailTransporter = async () => {
  try {
    await transporter.verify();
    console.log("SMTP transporter is ready to send emails.");
  } catch (error) {
    console.error("Failed to verify SMTP transporter:", error);
  }
};

interface SendRfpEmailParams {
  rfp: rfpDocument;
  vendor: VendorDocument;
  fromEmail?: string;
}

const buildItemsHtml = (rfp: rfpDocument): string => {
  if (!rfp.items || rfp.items.length === 0)
    return "<p>No specific line items defined.</p>";

  const listItems = rfp.items
    .map((item) => {
      const specs =
        item.specs && Object.keys(item.specs).length > 0
          ? Object.entries(item.specs)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")
          : "No extra specifications";

      return `<li>
          <strong>${item.name}</strong> – Qty: ${item.quantity}<br/>
          <em>Specs:</em> ${specs}
        </li>`;
    })
    .join("");

  return `<ul>${listItems}</ul>`;
};

export const sendRfpEmail = async ({
  rfp,
  vendor,
  fromEmail,
}: SendRfpEmailParams): Promise<void> => {
  const from = fromEmail || process.env.EMAIL_SMTP_USER;
  const to = vendor.email;

  console.log("Sending email to: ", to);

  if (!from) {
    throw new Error("No FROM email configured (check EMAIL_SMTP_USER in env).");
  }

  // Subject line
  const subject = `RFP: ${rfp.title || "Procurement Request"}`;

  // HTML body
  const itemsHtml = buildItemsHtml(rfp);

  const html = `
      <p>Hi ${vendor.name || "Vendor"},</p>
  
      <p>
        We are reaching out with a <strong>Request for Proposal (RFP)</strong> as part of our
        procurement process.
      </p>
  
      <h3>RFP Overview</h3>
      <p><strong>Title:</strong> ${rfp.title}</p>
      ${
        rfp.description
          ? `<p><strong>Description:</strong> ${rfp.description}</p>`
          : ""
      }
      <p><strong>Budget (approx.):</strong> ${
        rfp.budget ? `$${rfp.budget.toLocaleString()}` : "Not specified"
      }</p>
      <p><strong>Delivery Timeline:</strong> ${
        rfp.delivery_timeline_days
          ? `${rfp.delivery_timeline_days} days from award`
          : "Not specified"
      }</p>
      <p><strong>Payment Terms:</strong> ${
        rfp.payment_terms || "Not specified"
      }</p>
      <p><strong>Minimum Warranty:</strong> ${
        rfp.warranty_min_years
          ? `${rfp.warranty_min_years} year(s)`
          : "Not specified"
      }</p>
  
      <h3>Requested Items</h3>
      ${itemsHtml}
  
      <h3>What We Expect in Your Proposal</h3>
      <p>
        Please reply to this email with a proposal that includes:
      </p>
      <ul>
        <li>Pricing per line item and total price</li>
        <li>Delivery timeline (in days)</li>
        <li>Warranty period offered</li>
        <li>Payment terms</li>
        <li>Any additional terms & conditions</li>
      </ul>
  
      <p>
        Our internal system will automatically read and analyze your response
        (including any tables or attachments), so feel free to respond in your
        usual format.
      </p>
  
      <p>Looking forward to your proposal.</p>
  
      <p>Best regards,<br/>
      Procurement Team</p>
    `;

  const text = `
Hi ${vendor.name || "Vendor"},

We are reaching out with a Request for Proposal (RFP).

RFP Overview
- Title: ${rfp.title}
- Description: ${rfp.description || "N/A"}
- Budget: ${rfp.budget ? `$${rfp.budget}` : "Not specified"}
- Delivery timeline: ${
    rfp.delivery_timeline_days
      ? `${rfp.delivery_timeline_days} days from award`
      : "Not specified"
  }
- Payment terms: ${rfp.payment_terms || "Not specified"}
- Minimum warranty: ${
    rfp.warranty_min_years
      ? `${rfp.warranty_min_years} year(s)`
      : "Not specified"
  }

Requested Items:
${rfp.items
  .map((item) => {
    const specs =
      item.specs && Object.keys(item.specs).length > 0
        ? Object.entries(item.specs)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")
        : "No extra specifications";

    return `- ${item.name} (Qty: ${item.quantity}) [${specs}]`;
  })
  .join("\n")}

What we expect in your proposal:
- Pricing per line item and total price
- Delivery timeline (in days)
- Warranty period offered
- Payment terms
- Any additional terms & conditions

Please reply to this email with your proposal.

Best regards,
Procurement Team
  `.trim();

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log(`RFP email sent to ${to}. MessageId: ${info.messageId}`);
  } catch (error) {
    console.error(`Failed to send RFP email to ${to}:`, error);
    throw new Error("Failed to send RFP email");
  }
};
