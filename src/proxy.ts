import { type NextRequest, NextResponse } from "next/server";

const EXTERNAL_HOST = "arbeidsplassen-lab.ekstern.dev.nav.no";

const ALLOWED_EXTERNAL_PATHS = ["/brukertest"];

export function proxy(request: NextRequest) {
    const host = request.headers.get("host") ?? "";

    if (!host.includes(EXTERNAL_HOST)) {
        return NextResponse.next();
    }

    const path = request.nextUrl.pathname;

    // Tillat health-endepunkter
    if (path.startsWith("/api/internal/")) {
        return NextResponse.next();
    }

    // Tillat statiske filer (Next.js internals)
    if (path.startsWith("/_next/") || path.startsWith("/favicon")) {
        return NextResponse.next();
    }

    // Tillat kun /brukertest/* på ekstern ingress
    const isAllowed = ALLOWED_EXTERNAL_PATHS.some((p) => path.startsWith(p));
    if (isAllowed) {
        return NextResponse.next();
    }

    return new NextResponse("Ikke tilgjengelig", { status: 404 });
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
