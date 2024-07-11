import { Response } from "express";

interface IActionSuccessHandler {
  [key: string]: any;
}

export class ActionSuccessHandler {
  private res: Response;
  private data: IActionSuccessHandler;
  private message: string;
  private actionSuccess: boolean;
  private statusCode: number;
  constructor(
    res: Response,
    message: string,
    data: IActionSuccessHandler,
    actionSuccess = true,
    statusCode = 200
  ) {
    this.res = res;
    this.actionSuccess = actionSuccess;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.send();
  }

  private send() {
    this.res.status(this.statusCode).json({
      actionSuccess: this.actionSuccess,
      message: this.message,
      ...this.data,
    });
  }
}
