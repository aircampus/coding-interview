import "./officer-page.css";

export default function OfficerPage() {
  return (
    <div className="page">
      <h1 className="title">Strasbourg Police Bike Dept.</h1>
      <div className="container">
      <div className="sub-container">
        <h2 className="subtitle">Menu</h2>
        <p>Sélectionner une option</p>
        <ul>
          <li>Vélos volés</li>
          <li>Affaires en cours</li>
        </ul>
      </div>
      <div className="sub-container"></div>
      </div>
    </div>
  );
}
