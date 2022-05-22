import './modal.css';

export default function ({ children }) {
    return (
        <div
            className={'modal d-flex-center'}
        >
            {children}
        </div>
    )
}