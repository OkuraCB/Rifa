import { Button, Grid } from "@mui/material";
import "./App.css";
import p3dOST from "./When The Moon's Reaching Out Stars - Persona 3 Reload version (Sample Ver.).mp3";
import p3dImg from "./p3d.gif";
import mhw from "./Proof of a Hero - Monster Hunter World version.mp3";
import mhwImg from "./mhw2.gif";
import sos from "./Golden Elegance.mp3";
import sosImg from "./sos.gif";
import zzz from "./Toby Fox - UNDERTALE Soundtrack - 31 Waterfall.mp3";
import zzzImg from "./zzz.gif";
import rust from "./rust.mp3";
import rustImg from "./rust.gif";
import { useState } from "react";
import { VolumeOff } from "@mui/icons-material";

function App() {
  const [backImage, setImage] = useState<string>("");

  const [opP3D, setP3D] = useState<number>(1);
  const [opMHW, setMHW] = useState<number>(1);
  const [opSOS, setSOS] = useState<number>(1);
  const [opRUST, setRUST] = useState<number>(1);
  const [opZZZ, setZZZ] = useState<number>(1);

  const [playP3d, setPP3D] = useState<boolean>(false);
  const [playMHW, setPMHW] = useState<boolean>(false);
  const [playSOS, setPSOS] = useState<boolean>(false);
  const [playRUST, setPRUST] = useState<boolean>(false);
  const [playZZZ, setPZZZ] = useState<boolean>(false);

  const [textColor, setColor] = useState<string>("black");

  const resetVar = () => {
    setP3D(1);
    setMHW(1);
    setRUST(1);
    setSOS(1);
    setZZZ(1);
    setPP3D(false);
    setPMHW(false);
    setPSOS(false);
    setPRUST(false);
    setPZZZ(false);
  };

  const [source, setSource] = useState<string>("");

  const handleP3D = () => {
    const audio: any = document.getElementById("audio");

    if (playP3d) {
      audio.pause();
      setPP3D(false);
      return;
    }

    resetVar();
    setP3D(0.5);

    setSource(p3dOST);
    setColor("white");
    setImage(p3dImg);

    audio.load();
    audio.play();
    setPP3D(true);
  };

  const handleMHW = () => {
    const audio: any = document.getElementById("audio");

    if (playMHW) {
      audio.pause();
      setPMHW(false);
      return;
    }

    resetVar();
    setMHW(0.5);

    setSource(mhw);
    setColor("white");
    setImage(mhwImg);

    audio.load();
    audio.play();
    setPMHW(true);
  };

  const handleSOS = () => {
    const audio: any = document.getElementById("audio");

    if (playSOS) {
      audio.pause();
      setPSOS(false);
      return;
    }

    resetVar();
    setSOS(0.5);

    setSource(sos);
    setColor("white");
    setImage(sosImg);

    audio.load();
    audio.play();
    setPSOS(true);
  };

  const handleRUST = () => {
    const audio: any = document.getElementById("audio");
    if (playRUST) {
      audio.pause();
      setPRUST(false);
      return;
    }

    resetVar();
    setRUST(0.5);

    setSource(rust);
    setColor("black");
    setImage(rustImg);

    audio.load();
    audio.play();

    setPRUST(true);
  };

  const handleZZZ = () => {
    const audio: any = document.getElementById("audio");
    if (playZZZ) {
      audio.pause();
      setPZZZ(false);
      return;
    }

    resetVar();
    setZZZ(0.5);

    setSource(zzz);
    setColor("black");
    setImage(zzzImg);

    audio.load();
    audio.play();

    setPZZZ(true);
  };

  return (
    <div
      style={{
        backgroundImage: "url(" + backImage + ")",
        backgroundSize: "cover",
        height: "90vh",
        width: "150vh",
      }}>
      <audio id="audio" loop>
        <source id="source" src={source} type="audio/mpeg" />
      </audio>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid container item justifyContent="center" height="1000">
          <h2 style={{ color: textColor }}>Duda perguntou: "O que você fez no carnaval?"</h2>
        </Grid>
        <Grid container item justifyContent="space-evenly">
          <Button variant="contained" style={{ opacity: opP3D }} onClick={handleP3D}>
            {playP3d ? <VolumeOff /> : "P3D"}
          </Button>
          <Button variant="contained" style={{ opacity: opMHW }} onClick={handleMHW}>
            {playMHW ? <VolumeOff /> : "MHW"}
          </Button>
          <Button variant="contained" style={{ opacity: opSOS }} onClick={handleSOS}>
            {playSOS ? <VolumeOff /> : "SOS"}
          </Button>
          <Button variant="contained" style={{ opacity: opRUST }} onClick={handleRUST}>
            {playRUST ? <VolumeOff /> : "RUST"}
          </Button>
          <Button variant="contained" style={{ opacity: opZZZ }} onClick={handleZZZ}>
            {playZZZ ? <VolumeOff /> : "ZzZzZzZz"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
