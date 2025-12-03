import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

// Zod Schema
const RfpSchema = z.object({
  title: z.string(),
  budget: z.number().nullable(),
  delivery_timeline_days: z.number().nullable(),
  payment_terms: z.string().nullable(),
  warranty_min_years: z.number().nullable(),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      specs: z.record(z.string(), z.string()),
    })
  ),
});

type ParsedRfp = z.infer<typeof RfpSchema>;

const parser = StructuredOutputParser.fromZodSchema(RfpSchema);

// Model Declaration
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0,
});

const generatePrompt = (input: string) => `
Extract RFP information and return valid JSON:

${parser.getFormatInstructions()}

USER INPUT:
"""
${input}
"""
`;

export const parseRfpFromDescription = async (
  description: string
): Promise<ParsedRfp> => {
  try {
    const prompt = generatePrompt(description);
    const result = await model.invoke(prompt);

    const rawContent = Array.isArray(result.content)
      ? result.content
          .map((block) => ("text" in block ? block.text : String(block)))
          .join(" ")
      : result.content;

    const parsed = await parser.parse(rawContent);
    return parsed;
  } catch (error) {
    console.error("RFP parsing failed:", error);
    throw new Error("Unable to parse RFP description");
  }
};
