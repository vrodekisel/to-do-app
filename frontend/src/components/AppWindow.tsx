import type { ReactNode } from "react";
import "../styles/AppWindow.css";

type AppWindowProps = {
    children: ReactNode;
};

function AppWindow({ children }: AppWindowProps) {
    return (
        <main className="app-screen">
            <section className="app-window">
                <div className="app-window__inner">
                    {children}
                </div>
            </section>
        </main>
    );
}

export default AppWindow;