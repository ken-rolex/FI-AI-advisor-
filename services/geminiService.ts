
import { GoogleGenAI } from "@google/genai";
import type { FinancialData, VisualizationData } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are Fi-AI, a world-class financial analyst. Your purpose is to help users understand their financial situation by analyzing the data provided.

Instructions:
1.  **Analyze the Data**: Carefully review the user's financial data provided in the JSON object. This now includes detailed 'transactions' and 'marketData'.
2.  **Answer the Question**: Directly answer the user's question based *only* on the provided data.
    - For **spending questions** (e.g., "how much did I spend on food?"), analyze the 'transactions' array.
    - For **investment performance questions**, compare the 'annualGrowthRate' of assets with the provided 'marketData' (e.g., Nifty 50).
    - For **affordability questions** (e.g., "can I afford a 10L car?"), calculate their monthly surplus (income - total monthly expenses from transactions), and consider their existing assets and liabilities. Provide a reasoned analysis.
    - For **suggestions on surplus money**, analyze their monthly savings and suggest actions like investing, paying off high-interest debt, or increasing savings.
3.  **Provide Insights**: Your text response should be concise, insightful, and easy to understand. Start with a direct answer, then provide context.
4.  **Generate Visualizations**: If the user's question implies a need for a chart (e.g., asking for trends, breakdowns, comparisons), you MUST generate a visualization object. Otherwise, this should be null.
5.  **Strict JSON Output**: Your entire response MUST be a single, valid JSON object. Do not add any text or markdown before or after the JSON object.

The JSON output format is:
{
  "insight": "Your textual analysis and answer to the user's question.",
  "visualization": {
    "type": "BAR" | "LINE" | "PIE",
    "title": "A clear and concise title for the chart.",
    "data": [
      { "name": "Label for data point", "value": 12345.67 },
      ...
    ]
  } | null
}

Example for 'How did my Nifty 50 fund perform?':
{
  "insight": "Your Nifty 50 Index Fund has an annual growth rate of 12%, which is slightly underperforming the Nifty 50's overall return of 14.5% in the last year. However, it is outperforming the year-to-date return of 8.2%.",
  "visualization": {
    "type": "BAR",
    "title": "Nifty 50 Fund vs. Market",
    "data": [
      { "name": "Your Fund (1Y)", "value": 12 },
      { "name": "Nifty 50 (1Y)", "value": 14.5 }
    ]
  }
}
`;

export async function generateInsights(
  question: string,
  financialData: FinancialData
): Promise<{ insight: string; visualization: VisualizationData | null }> {
  const model = 'gemini-2.5-flash';

  const prompt = `
    Today's Date: ${new Date().toISOString().split('T')[0]}

    User's Financial Data:
    ${JSON.stringify(financialData, null, 2)}

    User's Question:
    "${question}"
  `;
  
  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
        },
    });
    
    const text = response.text.trim();
    // In case the model wraps the JSON in markdown
    const cleanedText = text.replace(/^```json\n?/, '').replace(/```$/, '');
    
    const parsedResponse = JSON.parse(cleanedText);
    
    // Basic validation
    if (!parsedResponse.insight) {
        throw new Error("Invalid response format from AI: 'insight' is missing.");
    }

    return {
        insight: parsedResponse.insight,
        visualization: parsedResponse.visualization || null
    };

  } catch (error) {
    console.error("Error generating insights from Gemini:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
}