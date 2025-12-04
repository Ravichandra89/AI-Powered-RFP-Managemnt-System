import Imap, { ImapMessage, FetchOptions } from "imap";
import { parseAndCreateProposal } from "./proposal.service";

export const startEmailListener = (): void => {
  const imap = new Imap({
    user: process.env.EMAIL_SMTP_USER!,
    password: process.env.EMAIL_SMTP_PASS!,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false,
    },
  });

  imap.once("ready", () => {
    imap.openBox("INBOX", false, () => {
      console.log("📩 Email listener started — watching inbox...");
      processUnreadEmails(imap);
      imap.on("mail", () => processUnreadEmails(imap)); // triggers on new emails
    });
  });

  imap.on("error", (err: any) => console.error("IMAP Error:", err));
  imap.on("end", () => {
    console.warn("IMAP Disconnected — reconnecting...");
    setTimeout(startEmailListener, 4000);
  });

  imap.connect();
};

const processUnreadEmails = (imap: Imap): void => {
  imap.search(["UNSEEN"], (err, results) => {
    if (err || !results?.length) return;

    const options: FetchOptions = { bodies: "", markSeen: true };
    const fetcher = imap.fetch(results, options);

    fetcher.on("message", (msg: ImapMessage) => {
      let rawBody = "";
      let rawHeader = "";

      msg.on("body", (stream, info) => {
        stream.on("data", (chunk: Buffer) => {
          const text = chunk.toString("utf8");
          if (info.which === undefined) rawHeader += text; // Gmail header
          rawBody += text; // Whole email
        });
      });

      msg.once("attributes", async () => {
        const { subject, from } = extractHeaderInfo(rawHeader);
        const vendorEmail = extractEmail(from);
        const rfpId = extractRfpId(subject);

        if (!rfpId) {
          console.log("⚠️ Ignored email — no RFP ID found in subject");
          return;
        }

        await parseAndCreateProposal({
          rfpId,
          vendorEmail,
          emailBody: extractBodyText(rawBody),
          emailMessageId: Date.now().toString(),
        });

        console.log(`✔ Proposal captured from ${vendorEmail}`);
      });
    });

    fetcher.once("end", () => console.log("📨 Processed unread queue"));
  });
};

/** Extract Body Text (removes headers + signatures) */
const extractBodyText = (raw: string): string =>
  raw.split("\n\n").slice(1).join("\n").trim();

/** Extract Subject + From from raw header */
const extractHeaderInfo = (header: string) => {
  const subject = header.match(/Subject:(.*)/i)?.[1]?.trim() ?? "";
  const from = header.match(/From:(.*)/i)?.[1]?.trim() ?? "";
  return { subject, from };
};

const extractEmail = (from: string): string =>
  from.match(/<(.*?)>/)?.[1] ?? from;

const extractRfpId = (subject: string): string | null => {
  const patterns = [
    /\[RFP-ID:(.*?)\]/i,
    /RFP[\s-_]?ID[:=\s]+([A-Za-z0-9]+)/i,
    /RFP[\s-_]?ID[\s-_]?([A-Za-z0-9]+)/i,
  ];

  for (const pattern of patterns) {
    const match = subject.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
};
