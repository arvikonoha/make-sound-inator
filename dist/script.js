let audioData = {
  Q: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FChord-1-G.wav?v=1594621855495",
    title: "Chord1 G" },

  W: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FChord-2-F%23.wav?v=1594621856305",
    title: "Chord2 F#" },

  E: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FHalfHat.wav?v=1594623270947",
    title: "Half Hat" },

  A: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FKick.wav?v=1594623277610",
    title: "Kick" },

  S: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FSnare.wav?v=1594623283758",
    title: "Snare" },

  D: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FOpenHat.wav?v=1594623285088",
    title: "Open Hat" },

  Z: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FTom.wav?v=1594623287816",
    title: "Tom" },

  X: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FPadHat.wav?v=1594623591799",
    title: "Pad Hat" },

  C: {
    src:
    "https://cdn.glitch.com/9f6b5e6b-e1e9-4b62-ade7-785077f08218%2FRim.wav?v=1594623602091",
    title: "Rim" } };



function DrumContainer({ playAudio, status, power, togglePower }) {
  let focusser = React.useRef(null);

  React.useEffect(() => {
    focusser.current.focus();
    console.log(focusser);
  }, []);

  return (
    React.createElement("div", { tabIndex: "0", ref: focusser, id: "drum-machine" },
    React.createElement(Drum, { playAudio: playAudio }),
    React.createElement(DrumControl, { status: status, power: power, togglePower: togglePower })));


}

function Drum({ playAudio }) {
  return (
    React.createElement("div", {
      id: "drum",
      onMouseDown: event => {
        if (event.target.classList.contains("key")) {
          playAudio(event.target.querySelector(".drum-audio").dataset.key);
          event.target.classList.add("press");
        }
      },
      onMouseUp: event => {
        document.querySelector(".press").classList.remove("press");
      },
      onKeyDown: event => {
        let audio = document.querySelector(
        `[data-key=${String.fromCharCode(event.which)}]`);

      } },

    [...Object.keys(audioData)].map((key) =>
    React.createElement("div", { className: "key drum-pad", id: key },
    React.createElement("span", { className: "key-text" }, key),
    React.createElement("audio", {
      "data-title": audioData[key].title,
      "data-key": key,
      class: "drum-audio clip",
      id: key,
      src: audioData[key].src,
      type: "audio/wav",
      controls: true,
      hidden: true })))));





}
function DrumControl({ status, power, togglePower }) {
  return (
    React.createElement("div", { id: "drum-control" },
    React.createElement("div", { id: "drum-logo" },
    React.createElement("h3", null,
    React.createElement("i", { style: { fontSize: "1.4rem" }, class: "fas fa-music" }), " ", React.createElement("br", null), "Make-Sound-Inator")),



    React.createElement("p", { class: "glow-blue" }, "Press the button or keys on the keyboard"),
    React.createElement("div", { id: "display", class: "active" },
    React.createElement("span", { class: "status-text" }, status)),

    React.createElement("button", {
      onClick: togglePower,
      className: power ? "power-btn btn active" : "power-btn btn " }, "Power")));





}

function App() {
  let [status, setStatus] = React.useState("");
  let [power, setPower] = React.useState(true);

  React.useEffect(() => {
    document.addEventListener("keydown", event => {
      playAudio(String.fromCodePoint(event.which));
    });

    document.addEventListener("keyup", event => {
      document.querySelector(".press").classList.remove("press");
    });
  }, []);

  function playAudio(key) {
    const audio = document.querySelector(`[data-key="${key}"]`);

    if (audio && power) {
      setTimeout(() => setStatus(""), 3000);
      setStatus(audioData[key].title + " pressed");
      audio.parentElement.classList.add("press");
      if (audio.paused) audio.play();else
      {
        audio.currentTime = 0;
        audio.play();
      }
    }
  }

  function togglePower() {
    setPower(power => !power);
    if (power) setStatus("Stand by");else
    {
      setStatus("Turned on!");
      setTimeout(() => setStatus(""), 2000);
    }
  }

  return (
    React.createElement(DrumContainer, {
      power: power,
      togglePower: togglePower,
      status: status,
      playAudio: playAudio }));


}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));