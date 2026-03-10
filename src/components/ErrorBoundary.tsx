"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 bg-red-900 text-white p-10 font-mono z-50">
                    <h1 className="text-2xl font-bold mb-4">React Three Fiber Error</h1>
                    <pre className="whitespace-pre-wrap text-sm">{this.state.error?.message}</pre>
                    <pre className="whitespace-pre-wrap text-xs mt-4 opacity-70">{this.state.error?.stack}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}
