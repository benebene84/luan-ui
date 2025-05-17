import { createContext, useContext } from "react";

type FormFieldContextType = {
	disabled?: boolean;
	required?: boolean;
	error?: boolean;
};

export const FormFieldContext = createContext<FormFieldContextType | undefined>(
	undefined,
);

export const FormFieldProvider = FormFieldContext.Provider;

export const useFormContext = (props: FormFieldContextType) => {
	const context = useContext(FormFieldContext);

	return {
		disabled: props.disabled ?? context?.disabled,
		required: props.required ?? context?.required,
		error: props.error ?? context?.error,
	};
};
