import * as Yup from 'yup';

export const declineInitialValues = {
    reason: '',
};

export const DeclineSchema = Yup.object().shape({
    reason: Yup.string().trim().required('Please enter a reason.'),
});