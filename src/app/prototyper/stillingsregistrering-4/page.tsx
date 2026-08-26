import type { Metadata } from "next";
import Annonseverksted from "./_components/Annonseverksted";

export const metadata: Metadata = {
    title: "Annonseverkstedet",
    description: "En adaptiv prototype som hjelper arbeidsgivere å skrive bedre stillingsannonser",
};

export default function AnnonseverkstedPage() {
    return <Annonseverksted />;
}
