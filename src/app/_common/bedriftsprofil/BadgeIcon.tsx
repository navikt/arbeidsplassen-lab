import {
    ArrowsSquarepathIcon,
    CarIcon,
    ChatCheckmarkIcon,
    ClockIcon,
    DoorOpenIcon,
    LightningIcon,
    LocationPinIcon,
    PlantIcon,
    StarIcon,
    TrendUpIcon,
} from "@navikt/aksel-icons";
import type { BadgeIconName } from "./types";

export default function BadgeIcon({ icon }: { icon: BadgeIconName }) {
    switch (icon) {
        case "car":
            return <CarIcon aria-hidden />;
        case "lightning":
            return <LightningIcon aria-hidden />;
        case "trend":
            return <TrendUpIcon aria-hidden />;
        case "plant":
            return <PlantIcon aria-hidden />;
        case "door":
            return <DoorOpenIcon aria-hidden />;
        case "repeat":
            return <ArrowsSquarepathIcon aria-hidden />;
        case "chat":
            return <ChatCheckmarkIcon aria-hidden />;
        case "star":
            return <StarIcon aria-hidden />;
        case "clock":
            return <ClockIcon aria-hidden />;
        case "location":
            return <LocationPinIcon aria-hidden />;
    }
}
