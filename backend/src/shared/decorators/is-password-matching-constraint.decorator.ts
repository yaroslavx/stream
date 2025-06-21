import { NewPasswordInput } from "@/src/modules/auth/password-recovery/inputs/new-password.input";
import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "IsPasswordMatching", async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
    public validate(passwordRepeat: string, args: ValidationArguments) {
        const object = args.object as NewPasswordInput

        return object.password === passwordRepeat
    }

    public defaultMessage(validationArguments?: ValidationArguments): string {
        return "Пароли не совпадают"
    }
}