import { Accordion } from "@navikt/ds-react";
import FilterGroupContent, { filterGroups } from "./FilterGroupContent";

export default function DesktopFilters() {
    return (
        <aside aria-label="Filtre">
            <Accordion size="small">
                {filterGroups.map((group) => (
                    <Accordion.Item key={group.id} defaultOpen={group.id === "published"}>
                        <Accordion.Header>{group.label}</Accordion.Header>
                        <Accordion.Content>
                            <FilterGroupContent group={group.id} />
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </aside>
    );
}
