import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  console.log("Making query now");

  const result = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((response) => response.data.choices[0].text)
    .catch(
      (error) =>
        `ChatGPT was unable to find an answer for that! (Error: ${error.message})`
    );

  return result;
};

export default query;
