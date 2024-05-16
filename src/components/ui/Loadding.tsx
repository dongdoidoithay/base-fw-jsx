const Loadding = () => {
    return (
        <div className="mb-4" style={{textAlign: "center", "margin": "0 auto" }}>
            <div className="spinner-grow spinner-grow-sm text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border spinner-border-sm text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border spinner-border-sm text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
export default Loadding;