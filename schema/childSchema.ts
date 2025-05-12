import * as Yup from 'yup';

export const childInitialState = {
    name: "",
    gender: "" as "male" | "female" | "",
    birthDate: "",
    concern_ids: [] as never[],
    concerns: [],
    therapist_matches: [],
    acceptedTherapists: [],
};

export const childSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    gender: Yup.mixed<"male" | "female" | "">()
        .oneOf(["male", "female"], "Invalid gender")
        .required("Gender is required"),
    birthDate: Yup.string().required("Birth date is required"),
    concern_ids: Yup.array().of(Yup.number()).required("At least one concern is required"),
});