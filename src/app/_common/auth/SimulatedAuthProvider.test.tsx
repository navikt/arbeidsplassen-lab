import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import SimulatedAuthProvider, { useSimulatedAuth } from "./SimulatedAuthProvider";

function AuthProbe() {
    const { status, login, logout } = useSimulatedAuth();

    return (
        <>
            <output data-testid="auth-status">{status}</output>
            <button type="button" onClick={login}>
                Logg inn lokalt
            </button>
            <button type="button" onClick={logout}>
                Logg ut lokalt
            </button>
        </>
    );
}

describe("SimulatedAuthProvider", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("beholder innlogging når provideren monteres på nytt", async () => {
        const firstRender = render(
            <SimulatedAuthProvider>
                <AuthProbe />
            </SimulatedAuthProvider>,
        );

        await waitFor(() => expect(screen.getByTestId("auth-status")).toHaveTextContent("not-authenticated"));
        fireEvent.click(screen.getByRole("button", { name: "Logg inn lokalt" }));
        expect(screen.getByTestId("auth-status")).toHaveTextContent("is-authenticated");

        firstRender.unmount();
        render(
            <SimulatedAuthProvider>
                <AuthProbe />
            </SimulatedAuthProvider>,
        );

        await waitFor(() => expect(screen.getByTestId("auth-status")).toHaveTextContent("is-authenticated"));
        fireEvent.click(screen.getByRole("button", { name: "Logg ut lokalt" }));
        expect(screen.getByTestId("auth-status")).toHaveTextContent("not-authenticated");
    });
});
