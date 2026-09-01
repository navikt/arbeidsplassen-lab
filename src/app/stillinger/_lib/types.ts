export type ApplicationChannel =
    | {
          type: "external";
          url: string;
      }
    | {
          type: "email";
          email: string;
      }
    | {
          type: "superrask";
          alternativeEmail?: string;
          form: SuperraskApplicationForm;
      };

export type SuperraskApplicationForm = {
    qualifications: Qualification[];
    questions: ScreeningQuestion[];
};

export type Qualification = {
    id: string;
    label: string;
};

export type ScreeningQuestion = {
    id: string;
    label: string;
    maxLength: number;
};

export type AdSection = {
    heading?: string;
    paragraphs?: string[];
    items?: string[];
};

export type Employer = {
    name: string;
    sector: "Offentlig" | "Privat";
    description?: string[];
    website?: string;
    linkedin?: string;
    facebook?: string;
};

export type WorkLocation = {
    address?: string;
    city: string;
    county: string;
    country?: string;
};

export type ContactPerson = {
    name: string;
    title?: string;
    phone?: string;
    email?: string;
};

export type Stilling = {
    id: string;
    title: string;
    jobTitle: string;
    employer: Employer;
    location: WorkLocation;
    shortSummary?: string;
    sections: AdSection[];
    published: string;
    updated: string;
    applicationDue?: string;
    applicationDueLabel?: string;
    startDateLabel: string;
    engagementType: string;
    extent: string[];
    workday: string[];
    workLanguages: string[];
    remote: string;
    positions: number;
    education: string;
    experience: string;
    driversLicense: string;
    occupation: string;
    isSummerJob: boolean;
    under18: boolean;
    contactList: ContactPerson[];
    source: string;
    reference: string;
    status: "ACTIVE" | "INACTIVE";
    application: ApplicationChannel;
    similarIds: string[];
};

export type PublishedFilter = "all" | "today" | "last3" | "last7";
export type SearchSort = "relevant" | "published" | "expires";

export type SearchCriteria = {
    terms: string[];
    published: PublishedFilter;
    locations: string[];
    occupations: string[];
    education: string[];
    experience: string[];
    driversLicense: string[];
    workLanguages: string[];
    extent: string[];
    engagementTypes: string[];
    sectors: string[];
    remote: string[];
    summerJobOnly: boolean;
    superraskOnly: boolean;
};

export type SavedSearch = {
    id: string;
    name: string;
    criteria: SearchCriteria;
    sort: SearchSort;
};

export type FilterOption = {
    value: string;
    label: string;
    count: number;
};

export type FilterOptions = {
    published: FilterOption[];
    locations: FilterOption[];
    occupations: FilterOption[];
    education: FilterOption[];
    experience: FilterOption[];
    driversLicense: FilterOption[];
    workLanguages: FilterOption[];
    extent: FilterOption[];
    engagementTypes: FilterOption[];
    sectors: FilterOption[];
    remote: FilterOption[];
    summerJob: FilterOption[];
    superrask: FilterOption[];
};
