import type { Stilling } from "./types";

type PaginatedStillinger = {
    items: Stilling[];
    page: number;
    totalPages: number;
};

export function paginateStillinger(
    stillinger: Stilling[],
    requestedPage: number,
    pageSize: number,
): PaginatedStillinger {
    const totalPages = Math.max(1, Math.ceil(stillinger.length / pageSize));
    const page = Math.min(Math.max(requestedPage, 1), totalPages);
    const start = (page - 1) * pageSize;

    return {
        items: stillinger.slice(start, start + pageSize),
        page,
        totalPages,
    };
}
