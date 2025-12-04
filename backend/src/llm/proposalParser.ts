import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const ProposalSchema = z.object({
  total_price: z.number(),
  delivery_days: z.number(),
  warranty_years: z.number(),
  payment_terms: z.string(),
  compliance_score: z.number().nullable().optional(), // 🔥 FIXED
  summary: z.string().optional(),
  items: z.array(
    z.object({
      rfp_item_id: z.string(),
      unit_price: z.number(),
      qty: z.number(),
      total: z.number(),
    })
  ),
});

export type ParsedProposal = z.infer<typeof ProposalSchema>;
const parser = StructuredOutputParser.fromZodSchema(ProposalSchema);

/* ----------------------- LLM MODEL ----------------------- */
/* Use a valid OpenAI model */
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini", // 🔥 UPDATED from non-existent model
  temperature: 0,
});

/* --------------------- PROMPT TEMPLATE -------------------- */
const generatePrompt = (emailText: string, rfpContext: string) => `
You are an AI procurement analyst.

Extract structured fields from the vendor's proposal email.
Use the RFP context to map line items correctly.

If any value is missing, infer logically.
If compliance score is unknown, return **0** (number), NEVER null.

RFP ITEMS CONTEXT:
${rfpContext}

Return ONLY valid JSON using this exact structure:
${parser.getFormatInstructions()}

Email Body:
"""
${emailText}
"""
`;

/* --------------------- MAIN PARSER FN --------------------- */
export const parseProposalFromEmail = async (
  emailText: string,
  rfpContext: string
): Promise<ParsedProposal> => {
  try {
    const prompt = generatePrompt(emailText, rfpContext);
    const result = await model.invoke(prompt);

    // Normalize the LLM response
    const rawContent =
      typeof result.content === "string"
        ? result.content
        : Array.isArray(result.content)
        ? result.content
            .map((b) => ("text" in b ? b.text : String(b)))
            .join(" ")
        : JSON.stringify(result.content);

    // Clean backticks if the model wraps JSON in ```
    const cleaned = rawContent.replace(/```json|```/g, "").trim();

    const parsed = await parser.parse(cleaned);

    // 🔥 Ensure compliance_score is a usable number
    if (parsed.compliance_score == null) {
      parsed.compliance_score = 0;
    }

    return parsed;
  } catch (error) {
    console.error("Failed to parse vendor proposal:", error);
    throw new Error(
      "Proposal parsing failed — invalid email format or model output"
    );
  }
};
