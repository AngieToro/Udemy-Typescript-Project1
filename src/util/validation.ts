//validation para los input 
export interface Validatable{

    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minNumber?: number;
    maxNumber?: number;
}

export function validateData(validatableInput : Validatable){

    let isValid = true;

    if (validatableInput.required){

        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if (validatableInput.minLength != null && typeof validatableInput.value === "string"){

        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if (validatableInput.maxLength != null && typeof validatableInput.value === "string"){

        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if (validatableInput.minNumber != null && typeof validatableInput.value === "number"){

        isValid = isValid && validatableInput.value >= validatableInput.minNumber;
    }

   if (validatableInput.maxNumber != null && typeof validatableInput.value === "number"){

        isValid = isValid && validatableInput.value <= validatableInput.maxNumber;
    }
        
    return isValid;
}