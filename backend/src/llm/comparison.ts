import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const ComparisonSchema = z.object({
  recommended_vendor_id: z.string(),
  reason: z.string(),
  ranking: z.array(
    z.object({
      vendor_id: z.string(),
      score: z.number(),
      summary: z.string(),
    })
  ),
});

export type ComparisonResult = z.infer<typeof ComparisonSchema>;

const parser = StructuredOutputParser.fromZodSchema(ComparisonSchema);

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0,
});

const generatePrompt = (rfpDetails: string, proposals: string) => `
  You are an AI procurement evaluation expert. Compare vendor proposals for an RFP.
  
  Your task:
  - Score each vendor (0-100)
  - Identify the best vendor
  - Explain WHY based on pricing, delivery time, warranty, and payment terms
  
  RFP REQUIREMENTS:
  ${rfpDetails}
  
  VENDOR PROPOSALS:
  ${proposals}
  
  Return ONLY valid JSON in this schema:
  ${parser.getFormatInstructions()}
  `;

export const compareProposals = async (
  rfp: any,
  proposals: any[]
): Promise<ComparisonResult> => {
  try {
    const rfpString = JSON.stringify(rfp, null, 2);
    const proposalString = JSON.stringify(proposals, null, 2);

    const prompt = generatePrompt(rfpString, proposalString);

    const result = await model.invoke(prompt);

    const rawContent = Array.isArray(result.content)
      ? result.content
          .map((block) => ("text" in block ? block.text : String(block)))
          .join(" ")
      : result.content;

    const parsed = await parser.parse(rawContent);
    return parsed;
  } catch (error) {
    console.error("Proposal comparison failed:", error);
    throw new Error("AI vendor comparison failed");
  }
};
