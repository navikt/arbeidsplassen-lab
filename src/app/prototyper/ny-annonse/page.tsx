import { redirect } from "next/navigation";
import { INITIAL_ADVERT_ID } from "@/app/stillingsregistrering/_mock/data";

export default function NyAnnonsePage() {
    redirect(`/stillingsregistrering/rediger/${INITIAL_ADVERT_ID}/steg/1`);
}
