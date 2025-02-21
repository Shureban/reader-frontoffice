import {FormInstance} from "antd";
import {AxiosResponse} from "axios";

export type TErrorResponse = AxiosResponse & {
    data: {
        errors: {
            [key: string]: string[]
        };
    };
};

enum HttpStatus {
    ValidationError = 422,
}

export const applyFormErrorResponse = (form: FormInstance, error: { response: TErrorResponse }) => {
    const isNotAValidationErrors = error.response.status !== HttpStatus.ValidationError;
    if (isNotAValidationErrors) {
        return;
    }

    Promise.resolve(error.response.data.errors)
        .then((errors) => Object.keys(errors))
        .then((errKeys) => {
            return errKeys.map((errorKey) => ({
                name: errorKey,
                errors: error.response.data.errors[errorKey],
            }));
        })
        .then((errorFields) => form.setFields(errorFields));
};
