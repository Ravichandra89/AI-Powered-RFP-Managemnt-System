import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const ProposalSchema = z.object({
  total_price: z.number(),
  delivery_days: z.number(),
  warranty_years: z.number(),
  payment_terms: z.string(),
  compliance_score: z.number().optional(),
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

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-40-mini",
  temperature: 0,
});

const generatePrompt = (emailText: string, rfpContext: string) => `
You are an AI procurement analyst. Extract structured proposal details
from the vendor's email.

Use the following RFP context to correctly map proposal line items:

RFP CONTEXT:
${rfpContext}

Return ONLY valid JSON in this format:
${parser.getFormatInstructions()}

Vendor Email:
"""
${emailText}
"""`;

export const parseProposalFromEmail = async (
  emailText: string,
  rfpContext: string
): Promise<ParsedProposal> => {
  try {
    const prompt = generatePrompt(emailText, rfpContext);
    const result = await model.invoke(prompt);

    // Normalize result.content into a string
    const rawContent = Array.isArray(result.content)
      ? result.content
          .map((block) => ("text" in block ? block.text : String(block)))
          .join(" ")
      : result.content;

    const parsed = await parser.parse(rawContent);
    return parsed;
  } catch (error) {
    console.error("Failed to parse vendor proposal:", error);
    throw new Error("Proposal parsing failed");
  }
};
