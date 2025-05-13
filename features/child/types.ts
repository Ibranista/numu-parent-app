export interface IConcern {
    id: string;
    title: string;
    description: string;
}

export interface IChildrenResponse extends IGetChildrenArgs {
    total: number;
    results: IChild[];
}

export interface IChild {
    id?: string;
    name: string;
    gender: "male" | "female" | "";
    birthDate: Date;
    concern_ids: string[];
    concerns: IConcern[];
    languages: string[];
    has_emotional_distress_signs?: boolean;
    is_behavior_challenging?: boolean;
    struggle_with_social?: boolean;
    child_activeness?: boolean;
    has_difficulty_movement?: boolean;
    has_learning_problems?: boolean;
    therapist_matches?: ITherapistMatch[];
    acceptedTherapists?: any[];
};

export interface ITherapist {
    id: number;
    name: string;
    image: string;
    expertise: IExpertise[];
    experience_years: number;
    bio: string;
    createdDate: string;
}

export interface ITherapistMatch {
    id: number;
    therapist: ITherapist;
    status: string;
    decline_reason: string;
    created_at: string;
    updated_at: string;
}

export interface IExpertise {
    id: number;
    expertise: string;
}

export interface IGetChildrenArgs {
    page?: number;
    limit?: number;
}
