import "./StarField.css";

const STREAM_COUNT = 60;
const DUST_COUNT = 20;

const streamParticles = Array.from({ length: STREAM_COUNT }, (_, index) => {
  const lane = index % 12;
  const group = Math.floor(index / 12);
  const size = 1.2 + (lane % 4) * 0.38 + group * 0.06;
  const driftDuration = 9 + (lane % 5) * 0.78 + group * 0.4;
  const driftDelay = -(index * 0.28);
  const twinkleDuration = 1.8 + (lane % 4) * 0.32;
  const twinkleDelay = -(lane * 0.22);
  const opacity = 0.28 + (lane % 5) * 0.05;
  const originX = 104 + group * 4.6 + lane * 1.45;
  const originY = -8 + group * 4.6 + lane * 1.25 + (lane - 5.5) * 0.92;
  const travelX = -(112 + group * 7.5 + lane * 2.8);
  const travelY = 94 + group * 6.6 + lane * 1.7;
  const trailLength = 92 + size * 20 + group * 4;
  const blur = 10 + size * 3.2;

  return {
    id: `stream-${index + 1}`,
    style: {
      "--star-size": `${size.toFixed(2)}px`,
      "--star-opacity": opacity.toFixed(2),
      "--drift-duration": `${driftDuration.toFixed(2)}s`,
      "--drift-delay": `${driftDelay.toFixed(2)}s`,
      "--twinkle-duration": `${twinkleDuration.toFixed(2)}s`,
      "--twinkle-delay": `${twinkleDelay.toFixed(2)}s`,
      "--origin-x": `${originX.toFixed(2)}vw`,
      "--origin-y": `${originY.toFixed(2)}vh`,
      "--travel-x": `${travelX.toFixed(2)}vw`,
      "--travel-y": `${travelY.toFixed(2)}vh`,
      "--trail-length": `${trailLength.toFixed(2)}px`,
      "--star-blur": `${blur.toFixed(2)}px`,
    },
  };
});

const dustParticles = Array.from({ length: DUST_COUNT }, (_, index) => {
  const column = index % 9;
  const row = Math.floor(index / 9);
  const size = 0.9 + (index % 3) * 0.35;
  const driftDuration = 15 + (index % 6) * 1.05 + row * 0.65;
  const driftDelay = -(index * 0.56);
  const twinkleDuration = 2.8 + (index % 4) * 0.45;
  const twinkleDelay = -(index % 5) * 0.35;
  const opacity = 0.09 + (index % 4) * 0.05;
  const originX = 102 + column * 6.8;
  const originY = -18 + row * 9.2 + column * 1.4;
  const travelX = -(118 + row * 9 + column * 3.4);
  const travelY = 124 + row * 7 + column * 2.2;
  const trailLength = 38 + size * 10;
  const blur = 6 + size * 2;

  return {
    id: `dust-${index + 1}`,
    style: {
      "--star-size": `${size.toFixed(2)}px`,
      "--star-opacity": opacity.toFixed(2),
      "--drift-duration": `${driftDuration.toFixed(2)}s`,
      "--drift-delay": `${driftDelay.toFixed(2)}s`,
      "--twinkle-duration": `${twinkleDuration.toFixed(2)}s`,
      "--twinkle-delay": `${twinkleDelay.toFixed(2)}s`,
      "--origin-x": `${originX.toFixed(2)}vw`,
      "--origin-y": `${originY.toFixed(2)}vh`,
      "--travel-x": `${travelX.toFixed(2)}vw`,
      "--travel-y": `${travelY.toFixed(2)}vh`,
      "--trail-length": `${trailLength.toFixed(2)}px`,
      "--star-blur": `${blur.toFixed(2)}px`,
    },
  };
});

const StarField = () => (
  <div className="starfield" aria-hidden="true">
    <div className="starfield__mesh starfield__mesh--one" />
    <div className="starfield__mesh starfield__mesh--two" />
    <div className="starfield__beam starfield__beam--outer" />
    <div className="starfield__beam starfield__beam--inner" />
    <div className="starfield__comet" />
    <div className="starfield__vignette" />

    <div className="starfield__layer starfield__layer--dust">
      {dustParticles.map((star) => (
        <span
          key={star.id}
          className="starfield__star starfield__star--dust"
          style={star.style}
        />
      ))}
    </div>

    <div className="starfield__layer starfield__layer--stream">
      {streamParticles.map((star) => (
        <span
          key={star.id}
          className="starfield__star starfield__star--stream starfield__star--trail"
          style={star.style}
        />
      ))}
    </div>
  </div>
);

export default StarField;
