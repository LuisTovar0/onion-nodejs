import ValidationError from "./validationError";

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {

  public static againstNullOrUndefined(argument: any, argumentName: string) {
    if (argument === null || argument === undefined)
      throw new ValidationError(argumentName + ' is null or undefined');
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection) {
    for (let arg of args)
      this.againstNullOrUndefined(arg.argument, arg.argumentName);
  }

  public static isOneOf(value: any, validValues: any[], argumentName: string) {
    let isValid = false;
    for (let validValue of validValues)
      if (value === validValue) {
        isValid = true;
        break;
      }

    if (!isValid)
      throw new ValidationError(argumentName + ' isn\'t oneOf the correct types in '
        + JSON.stringify(validValues) + '. Got "' + value + '".');
  }

  public static inRange(num: number, min: number, max: number, argumentName: string) {
    const isInRange = num >= min && num <= max;
    if (!isInRange)
      throw new ValidationError(`${argumentName} is not within range ${min} to ${max}.`);
  }

  public static isInteger(n: number, argumentName: string) {
    if (Number.isNaN(n) || !Number.isInteger(n))
      throw new ValidationError(argumentName + ' is not an integer.');
  }

  public static allInRange(numbers: number[], min: number, max: number, argumentName: string) {
    for (let num of numbers)
      this.inRange(num, min, max, argumentName);
  }

}