const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make.
Format your response in markdown.
`;

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `
${SYSTEM_PROMPT}
I have ${ingredientsString}.
Please give me a recipe you'd recommend I make!
                `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API ERROR:", errorText);
      return "Server error";
    }

    const data = await response.json();
    console.log("HF RESPONSE:", data);

    // ✅ รองรับ chat completion format
    if (data.choices) {
      return data.choices[0]?.message?.content || "No response";
    }

    // ✅ รองรับ text generation format
    if (Array.isArray(data)) {
      return data[0]?.generated_text || "No response";
    }

    return "No response";
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return "Error generating recipe.";
  }
}
