import * as Yup from 'yup';

export const childInitialState = {
    name: "",
    gender: "",
    birthDate: "",
    concern_ids: [],
    languages: [],
    has_emotional_distress_signs: undefined,
    is_behavior_challenging: undefined,
    struggle_with_social: undefined,
    child_activeness: undefined,
    has_difficulty_movement: undefined,
    has_learning_problems: undefined,
    has_communication_problems: undefined,
    has_meal_problems: undefined,
    has_difficulty_with_sleep: undefined,
    did_we_miss_anything: "",
};

export const childSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    gender: Yup.mixed<"male" | "female" | "">()
        .oneOf(["male", "female"], "Invalid gender")
        .required("Gender is required"),
    birthDate: Yup.string().required("Birth date is required"),
    concern_ids: Yup.array().of(Yup.number()).required("At least one concern is required"),
    languages: Yup.array()
        .of(Yup.string().oneOf([
            "arabic",
            "english",
            "french",
            "spanish",
            "hindi",
            "bengali",
            "tagalog",
            "urdu",
            "farsi",
            "other"
        ]))
        .min(1, "Select at least one language")
        .required("At least one language is required"),
    has_emotional_distress_signs: Yup.boolean()
        .typeError("Please select Yes or No")
        .required("Please select Yes or No"),
    is_behavior_challenging: Yup.boolean()
        .typeError("Please select Yes or No")
        .required("Please select Yes or No"),
    has_difficulty_movement: Yup.boolean().required("Please select an option"),
    has_learning_problems: Yup.boolean().required("Please select an option"),
    has_communication_problems: Yup.boolean().required("Please select an option"),
    has_meal_problems: Yup.boolean().required("Please select an option"),
    has_difficulty_with_sleep: Yup.boolean().required("Please select an option"),
    did_we_miss_anything: Yup.string().max(1000, "Please keep your answer under 1000 characters"),
});