import OpenAI from "openai";
import ChatBotMessage from "../models/chatbot.model.js";

class OpenAIChatbot {
  constructor(apiKey) {
    this.OpenAI = new OpenAI({
      apiKey: apiKey
    });
  }

  async sendMessage(userId, message) {
    try {
      await ChatBotMessage.create({ userId, message, role: "user" });

      const chatHistory = await ChatBotMessage.find({ userId });

      const response = await this.OpenAI.chatCompletion.create({
        model: "text-davinci-003",
        messages: [
          ...chatHistory.map(message => ({
            role: message.role,
            content: message.message
          })),
          {
            role: "user",
            content: message
          }
        ]
      });

      await ChatBotMessage.create({
        userId,
        message: response.data.choices[0].message.content,
        role: "assistant"
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
      throw new Error("Could not send message to OpenAI");
    }
  }
}

export default OpenAIChatbot;
