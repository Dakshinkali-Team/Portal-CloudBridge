export class AppError extends Error { //custom error class that extends the built-in Error class
  constructor(statusCode, message, details = null) { //constructor takes in status code, error message, and optional details
    super(message); //call the parent constructor with the error message
    this.name = "AppError";         //set the name of the error to "AppError"
    this.statusCode = statusCode;     //set the status code of the error
    this.details = details;        //set the details of the error (if provided)
    this.isOperational = true;    //mark this error as operational (i.e., expected and handled)
  }
}

export const createAppError = (statusCode, message, details = null) =>          //factory function to create a new AppError instance
  new AppError(statusCode, message, details);      //return a new instance of the AppError class
