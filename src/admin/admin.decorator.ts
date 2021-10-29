import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { getManager } from 'typeorm';
  
  @ValidatorConstraint({ async: true })
  export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(userName: any, args: ValidationArguments) {
       const user = await getManager().query('select * from admin where username = "' + userName + '"');
       if(user.length == 0)
            return true;
       return false;
    }
  }
  
  export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserAlreadyExistConstraint,
      });
    };
  }