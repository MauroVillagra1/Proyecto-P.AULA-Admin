import React from 'react';
import "./StatusClassroom.css";
import Button from 'react-bootstrap/Button';

function StatusClassroom({ clases, currentIndex, setCurrentIndex, closePopup }) {
  const clase = clases[currentIndex];
  if (!clase) return null;

  return (
    <div className='status-classroom-conteiner'>
      <div className='status-clasroom-title'>
        <h3>{clase.aula.nombre}</h3>
        <button onClick={closePopup}>x</button>
      </div>
      <div className='status-classroom-body'>
        <ul>
          <li>Materia: <span>{clase.materia.nombre}</span></li>
          <li>Comisión: <span>{clase.comision.numero}</span></li>
          <li>Docente: <span>{clase.profesor.nombre}</span></li>
          <li>Horario: <span>{clase.horario_inicio} - {clase.horario_fin}</span></li>
        </ul>
        <div className='status-classroom-buttons'>
          <Button
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="secondary"
            disabled={currentIndex === clases.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StatusClassroom;
