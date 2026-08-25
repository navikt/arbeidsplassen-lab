export type Stilling = {
    id: string;
    title: string;
    jobTitle?: string;
    employer: {
        name: string;
        orgnr?: string;
        sector?: string;
        logoUrl?: string;
    };
    location: {
        city?: string;
        county?: string;
        country?: string;
        postalCode?: string;
    };
    description: string;
    qualifications?: string[];
    published: string;
    applicationDue?: string;
    engagementType?: string;
    extent?: string[];
    workday?: string[];
    workHours?: string[];
    remote?: string;
    contactList?: ContactPerson[];
    source?: string;
    applicationUrl?: string;
    status: "ACTIVE" | "INACTIVE";
};

export type ContactPerson = {
    name: string;
    title?: string;
    email?: string;
    phone?: string;
};

export type FilterOption = {
    key: string;
    label: string;
    count: number;
};

export type SearchFilters = {
    locations: FilterOption[];
    occupations: FilterOption[];
    extent: FilterOption[];
    published: FilterOption[];
};

export type Artikkel = {
    slug: string;
    title: string;
    description: string;
    body: string;
};
