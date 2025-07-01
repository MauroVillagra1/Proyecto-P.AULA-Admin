import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginAdmin from "./components/login-admin/LoginAdmin";
import "./App.css";
import StatusClassroom from "./components/statusclassroom/StatusClassroom";
import Main from "./main/Inicio.jsx";
import Navbar from "./cummon/Navbar.jsx";
import axios from "axios";


function App() {
  const [busqueda, setBusqueda] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
const [pisoActual, setPisoActual] = useState("Planta Baja");
const [highlightedAulaId, setHighlightedAulaId] = useState(null);

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
  
    const fetchClasesDelDia = async () => {
      try {
          const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const diaActual = diasSemana[new Date().getDay()];

      const res = await axios.get(`https://p-aula-back-29ln.vercel.app/api/clase/dia?dia=${diaActual}`);
        setClassrooms(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error al traer las clases del día", err);
      }
    };

    fetchClasesDelDia();
  }, []);


  const handleBusquedaChange = (texto) => {
    setBusqueda(texto);
  };

  const handleAulaSelect = (aula) => {
    setSelectedClassroom(aula);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  return (
    <>
     <Navbar
  aulas={classrooms}
  onBusquedaChange={handleBusquedaChange}
  onAulaSelect={handleAulaSelect}
  setPisoActual={setPisoActual}
  pisoActual={pisoActual}
  setHighlightedAulaId={setHighlightedAulaId}
/>
<Main
  classrooms={classrooms}
  busqueda={busqueda}
  selectedClassroom={selectedClassroom}
  setSelectedClassroom={setSelectedClassroom}
  setShowPopup={setShowPopup}
  showPopup={showPopup}
  closePopup={closePopup}
  pisoActual={pisoActual}
  setPisoActual={setPisoActual}
  highlightedAulaId={highlightedAulaId}
/>
    </>
  );
}

export default App;
