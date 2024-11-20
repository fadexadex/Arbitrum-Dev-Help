import { Response, Request, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import { getGroqChatCompletion } from "../service/chatService";

const chat = async (req: Request, res: Response, next: NextFunction) => {
  const { prompt } = req.body;
  try {
    const message = await getGroqChatCompletion(prompt);
    if (message == "") {
      throw new AppError("No response from the AI model", 500);
    }
    res.status(200).json({ message });
  } catch (e) {
    next(e);
  }
};

export default chat;
