import { IChild } from "@/features/child/types";
import { FormikErrors, FormikTouched, FormikValues } from "formik";

export interface IStepFormProps {
    setStep: (step: number) => void;
    values: FormikValues;
    errors?: FormikErrors<IChild>;
    touched?: FormikTouched<any>;
    handleChange?: any;
    handleBlur?: any;
    children?: React.ReactNode;
    concernList?: any[];
    handleSubmit?: () => void;
    isSubmitting?: boolean;
}

export interface IGenderOptionProps {
    gender: string;
    selectedGender: string | undefined;
    onPress: () => void;
    icon: any;
    label: string;
};
