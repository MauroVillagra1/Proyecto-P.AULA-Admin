import React, { useState, useEffect, useRef } from 'react';
import './Inicio.css';
import { Button } from 'react-bootstrap';
import StatusClassroom from '../components/statusclassroom/StatusClassroom';
import Navbar from '../cummon/Navbar';



function Main({ classrooms, busqueda, selectedClassroom, setSelectedClassroom, setShowPopup, showPopup, closePopup, pisoActual, highlightedAulaId }) {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const horaActual = new Date().toTimeString().slice(0, 5); // "HH:MM"

const [clasesPorAula, setClasesPorAula] = useState({});
const [clasesDelPopup, setClasesDelPopup] = useState([]);
const [claseIndex, setClaseIndex] = useState(0);




  const imagenesPorPiso = {
    "Subsuelo": "https://res.cloudinary.com/dnibad7yk/image/upload/v1750794347/GESTOR_DE_AULAS_UTN_FRT_m4fvu2.png",
    "Planta Baja": "https://res.cloudinary.com/dnibad7yk/image/upload/v1750791969/PLANTA_BAJA_mlns0q.png",
    "Piso 1": "https://res.cloudinary.com/dnibad7yk/image/upload/v1750792496/PRIMER_PISO_hjd1vl.png",
    "Piso 2": "https://res.cloudinary.com/dnibad7yk/image/upload/v1750795260/GESTOR_DE_AULAS_UTN_FRT_1_e1eo1v.png"
  };
const areasPorPiso = {
  "Planta Baja": [
    { id: 'Aula 158', coords: { x1: 1, y1: 15, x2: 12, y2: 25 }, label: 'Aula 158' },
    { id: 'Aula 156', coords: { x1: 1, y1: 27, x2: 12, y2: 42 }, label: 'Aula 156' },
    { id: 'Aula 154', coords: { x1: 1, y1: 44, x2: 12, y2: 58 }, label: 'Aula 154' },
    { id: 'Laboratorio1', coords: { x1: 1, y1:60, x2: 12, y2: 69 }, label: 'Laboratorio' },
    { id: 'Aula 159', coords: { x1: 21, y1: 2, x2: 28, y2: 10 }, label: 'Aula 159' },
    { id: 'Aula 157', coords: { x1: 21, y1: 13, x2: 28, y2: 24 }, label: 'Aula 157' },
    { id: 'Aula 155', coords: { x1: 21, y1: 27, x2: 28, y2: 40 }, label: 'Aula 155' },
    { id: 'Aula 153', coords: { x1: 21, y1: 42, x2: 28, y2: 57 }, label: 'Aula 153' },
    { id: 'Laboratorio2', coords: { x1: 21, y1: 60, x2: 28, y2: 76 }, label: 'Laboratorio' },
    { id: 'Aula 118', coords: { x1: 58, y1: 33, x2: 69, y2: 41 }, label: 'Aula 118' },
    { id: 'Aula 116', coords: { x1: 58, y1: 43, x2: 69, y2: 51}, label: 'Aula 116' },
    { id: 'Aula 114', coords: { x1: 58, y1: 53, x2: 69, y2: 61 }, label: 'Aula 114' },
    { id: 'Aula 112', coords: { x1: 58, y1: 63, x2: 69, y2: 71 }, label: 'Aula 112' },
    { id: 'Aula 115', coords: { x1: 83, y1: 56, x2: 99, y2: 62 }, label: 'Aula 115' },
    { id: 'Aula 117', coords: { x1: 83, y1: 45, x2: 99, y2: 54 }, label: 'Aula 117' },
    { id: 'Aula 119', coords: { x1: 83, y1: 35, x2: 99, y2: 43 }, label: 'Aula 119' },
    { id: 'Aula 121', coords: { x1: 83, y1: 23, x2: 99, y2: 32 }, label: 'Aula 121' },





  ],
  "Piso 1": [
    { id: 'Aula 108', coords: { x1: 1, y1: 2, x2: 12, y2: 17 }, label: 'Aula 108' },
    { id: 'Aula 113', coords: { x1: 1, y1: 20, x2: 12, y2: 33 }, label: 'Aula 113' },
    { id: 'Aula 104', coords: { x1: 1, y1: 35, x2: 12, y2: 49 }, label: 'Aula 104' },
    { id: 'Aula 102', coords: { x1: 1, y1: 52, x2: 12, y2: 64 }, label: 'Aula 102' },
    { id: 'Aula 107', coords: { x1: 21, y1: 2, x2: 28, y2: 18 }, label: 'Aula 107' },
    { id: 'Aula 105', coords: { x1: 21, y1: 20, x2: 28, y2: 39 }, label: 'Aula 105' },
    { id: 'Aula 103', coords: { x1: 21, y1: 42, x2: 28, y2: 57 }, label: 'Aula 103' },
    { id: 'Aula 101', coords: { x1: 21, y1: 59, x2: 28, y2: 73 }, label: 'Aula 101' },
    { id: 'Aula 218', coords: { x1: 58, y1: 35, x2: 69, y2: 44 }, label: 'Aula 218' },
    { id: 'Aula 216', coords: { x1: 58, y1: 45, x2: 69, y2: 54 }, label: 'Aula 216' },
    { id: 'Aula 214', coords: { x1: 58, y1: 55, x2: 69, y2: 63 }, label: 'Aula 214' },
    { id: 'Aula 212', coords: { x1: 58, y1: 65, x2: 69, y2: 73 }, label: 'Aula 212' },
    { id: 'Aula 221', coords: { x1: 83, y1: 23, x2: 99, y2: 33 }, label: 'Aula 221' },
    { id: 'Aula 219', coords: { x1: 83, y1: 35, x2: 99, y2: 43 }, label: 'Aula 219' },
    { id: 'Aula 217', coords: { x1: 83, y1: 45, x2: 99, y2: 54 }, label: 'Aula 217' },
    { id: 'Aula 215', coords: { x1: 83, y1: 56, x2: 99, y2: 62 }, label: 'Aula 215' }
  ],
  "Subsuelo": [
  ],
  // etc.
};





  const imagenActual = imagenesPorPiso[pisoActual];
  const areas = areasPorPiso[pisoActual] || [];

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setImageDimensions({ width, height });
      }
    });



    observer.observe(img);
    return () => observer.disconnect();
  }, []);


    useEffect(() => {
  const agrupadas = {};

  classrooms.forEach(c => {
    const nombre = c.aula.nombre;
    if (!agrupadas[nombre]) agrupadas[nombre] = [];
    agrupadas[nombre].push(c);
  });

  // Ordenar por horario
  Object.keys(agrupadas).forEach(aula => {
    agrupadas[aula] = agrupadas[aula].sort((a, b) => a.horario_inicio.localeCompare(b.horario_inicio));
  });

  setClasesPorAula(agrupadas);
}, [classrooms]);

  const getAbsoluteCoordinates = (coords) => {
    const { width, height } = imageDimensions;
    const { x1, y1, x2, y2 } = coords;
    
    
   

    return {
      x1: (x1 / 100) * width,
      y1: (y1 / 100) * height,
      x2: (x2 / 100) * width,
      y2: (y2 / 100) * height,
    };
  };
 const getClaseActual = (aulaId) => {
  const clases = clasesPorAula[aulaId] || [];
  return clases.find(c => c.horario_inicio <= horaActual && horaActual < c.horario_fin);
};

 const getButtonColor = (aulaId) => {
  return getClaseActual(aulaId) ? 'danger' : 'secondary';
};

const handleClick = (aulaId) => {
  const clases = clasesPorAula[aulaId] || [];
  const indexClaseActual = clases.findIndex(c => c.horario_inicio <= horaActual && horaActual < c.horario_fin);
  setClasesDelPopup(clases);
  setShowPopup(true);
  if (indexClaseActual === -1) return; // No hay clase activa

  setClaseIndex(indexClaseActual);

};


  return (
    <>

      <div className="content-main">
        <div className="image-wrapper">
          <img
            src={imagenActual}
            alt={`Mapa ${pisoActual}`}
            ref={imageRef}
          />

          {areas.map((area, index) => {
            const { x1, y1, x2, y2 } = getAbsoluteCoordinates(area.coords);
            return (
              <Button
                className={`Button-main-map ${highlightedAulaId === area.id ? "button-highlight" : ""}`}
                key={index}
                variant={getButtonColor(area.id)}
                style={{
                  position: 'absolute',
                  left: `${x1}px`,
                  top: `${y1}px`,
                  width: `${x2 - x1}px`,
                  height: `${y2 - y1}px`,
                }}
                onClick={() => handleClick(area.id)}
              >
                {area.label}
              </Button>
            );
          })}
        </div>

    {showPopup && clasesDelPopup.length > 0 && (
  <div className="status-classroom-overlay">
    <StatusClassroom
      clases={clasesDelPopup}
      currentIndex={claseIndex}
      setCurrentIndex={setClaseIndex}
      closePopup={closePopup}
    />
  </div>
)}

      </div>
    </>
  );
}

export default Main;


