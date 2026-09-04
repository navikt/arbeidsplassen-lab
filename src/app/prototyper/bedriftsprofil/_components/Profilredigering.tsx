import { Accordion, Heading, VStack } from "@navikt/ds-react";
import type {
    EmployerBadgeResult,
    EmployerProfile,
    UpdateEmployerProfileField,
} from "@/app/_common/bedriftsprofil/types";
import Aktivitetsmerker from "./Aktivitetsmerker";
import ArbeidsgiverlofteSkjema from "./ArbeidsgiverlofteSkjema";
import GrunnprofilSkjema from "./GrunnprofilSkjema";
import NokkelfaktaSkjema from "./NokkelfaktaSkjema";
import VisuellProfilVelger from "./VisuellProfilVelger";

type ProfilredigeringProps = {
    profile: EmployerProfile;
    badges: EmployerBadgeResult[];
    updateField: UpdateEmployerProfileField;
    updateHighlight: (index: number, value: string) => void;
};

export default function Profilredigering({ profile, badges, updateField, updateHighlight }: ProfilredigeringProps) {
    return (
        <VStack gap="space-16">
            <Heading id="profilredigering-heading" level="2" size="large">
                Bygg profilen
            </Heading>
            <Accordion data-color="neutral" indent={false}>
                <Accordion.Item defaultOpen>
                    <Accordion.Header>Grunnprofil</Accordion.Header>
                    <Accordion.Content>
                        <GrunnprofilSkjema profile={profile} updateField={updateField} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Visuell profil</Accordion.Header>
                    <Accordion.Content>
                        <VisuellProfilVelger profile={profile} updateField={updateField} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Slik er det å jobbe hos oss</Accordion.Header>
                    <Accordion.Content>
                        <ArbeidsgiverlofteSkjema
                            profile={profile}
                            updateField={updateField}
                            updateHighlight={updateHighlight}
                        />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Nøkkelinformasjon</Accordion.Header>
                    <Accordion.Content>
                        <NokkelfaktaSkjema profile={profile} updateField={updateField} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Aktivitetsmerker</Accordion.Header>
                    <Accordion.Content>
                        <Aktivitetsmerker badges={badges} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VStack>
    );
}
