import { useParallaxStyle } from "./hooks/useParallaxStyle";
import "./App.css";

import img1 from "/assets/img1.png";
import img2 from "/assets/img2.png";
import img3 from "/assets/img3.png";
import img4 from "/assets/img4.png";
import img5 from "/assets/img5.png";
import img6 from "/assets/img6.png";

function App() {
  const parallax = useParallaxStyle();

  return (
    <main>

      <section className="page page-one">
        <h1>Scroll Parallax Gallery</h1>
        <p>Images move smoothly up & down based on scroll</p>

        <div className="image-grid">
          <img src={img1} style={parallax({ speed: 0.12 })} />
          <img src={img2} style={parallax({ speed: 0.12 })} />
          <img src={img3} style={parallax({ speed: 0.12 })} />
        </div>

        <div className="image-grid">
          <img src={img4} style={parallax({ speed: 0.12 })} />
          <img src={img5} style={parallax({ speed: 0.12 })} />
          <img src={img6} style={parallax({ speed: 0.12 })} />
        </div>
      </section>

      <section className="page page-two">
        <h1>Second Page</h1>
        <p>Same parallax hook reused here</p>

        <div className="image-grid">
          <img src={img2} style={parallax({ speed: 0.18, min: -80, max: 80 })} />
          <img src={img4} style={parallax({ speed: 0.12 })} />
          <img src={img6} style={parallax({ speed: 0.12 })} />
        </div>

        <div className="image-grid">
          <img src={img1} style={parallax({ speed: 0.12 })} />
          <img src={img3} style={parallax({ speed: 0.12 })} />
          <img src={img5} style={parallax({ speed: 0.12 })} />
        </div>
      </section>

    </main>
  );
}

export default App;
