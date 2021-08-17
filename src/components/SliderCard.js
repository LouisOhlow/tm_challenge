import "./SliderCard.css";

function SliderCard({ headline, description }) {
  return (
    <div className="card">
      <div className="textContainer">
        <div className="overline">
          <h4>CASE STUDY</h4>
        </div>
        <div className="headline">
          <h1>{headline}</h1>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
