export interface IConcern {
    id: string;
    title: string;
    description: string;
}

export interface IChildResponse {
    id: string;
    name: string;
    gender: "male" | "female";
    birthDate: string;
    parent: string;
    concerns: IConcern[];
    therapist_matches: string[];
    acceptedTherapists: string[];
}

export interface IChild {
    id?: string;
    name: string;
    gender: "male" | "female" | "";
    birthDate: string;
    concern_ids: string[];
};