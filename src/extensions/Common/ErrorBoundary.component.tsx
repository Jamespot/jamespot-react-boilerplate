import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    height: 40px;
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
    border-radius: 10px;
    padding: 8px;
    margin: 5px;
`;

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public override state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public override render() {
        if (this.state.hasError) {
            return <ErrorMessage>Oups, une erreur est survenue</ErrorMessage>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
