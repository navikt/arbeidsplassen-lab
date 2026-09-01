import { describe, expect, it } from "vitest";
import { createEmptyAdvertForm } from "@/app/stillingsregistrering/_mock/data";
import { mockStillinger } from "./annonser";
import { fictionalContactNames, fictionalEmployerNames } from "./mockIdentities";

const previousIdentities = [
    "Ola Eksempel",
    "Henrik Eksempel",
    "Magnus Eksempel",
    "Bane Nord",
    "Raven Media",
    "Lavvo AS",
    "Hos Magnus",
    "Burgerhuset",
    "Bodø Handel",
    "HKS Husholding",
    "Repaiable Operations",
    "Jamt AS",
    "Velkommen AS",
    "Kundehuset",
    "Nordlys Design",
    "Aurora Omsorg",
    "Sjøsjøen Renhold",
    "L.M. Transport",
    "Pust Ventilasjon",
    "Gandio",
    "Trømse Ferie",
    "Små Barnehager",
    "Nav eksempel",
    "Eksempel kommune",
    "Helseeksempel",
    "Vestland Partner",
    "Nordkundeservice",
    "Nordkafé",
    "Unyttig Komisk Hund",
];

describe("fiktive identiteter i stillingsdata", () => {
    it("bruker bare arbeidsgivere fra den fiktive navnelisten", () => {
        const allowedEmployers = new Set<string>(Object.values(fictionalEmployerNames));

        expect(mockStillinger.every((stilling) => allowedEmployers.has(stilling.employer.name))).toBe(true);
        expect(allowedEmployers.has(createEmptyAdvertForm().bedriftsnavn)).toBe(true);
    });

    it("bruker bare fiktive kontaktpersoner og ugyldige testadresser", () => {
        const allowedContacts = new Set<string>(Object.values(fictionalContactNames));
        const contacts = mockStillinger.flatMap((stilling) => stilling.contactList);

        expect(contacts).toHaveLength(3);
        expect(contacts.every((contact) => allowedContacts.has(contact.name))).toBe(true);
        expect(contacts.every((contact) => contact.email?.endsWith(".example.invalid") === true)).toBe(true);
        expect(contacts.every((contact) => contact.phone === "00000000")).toBe(true);
    });

    it("inneholder ingen av navnene som ble erstattet", () => {
        const serializedMocks = JSON.stringify([mockStillinger, createEmptyAdvertForm()]);

        expect(previousIdentities.filter((identity) => serializedMocks.includes(identity))).toEqual([]);
    });
});
