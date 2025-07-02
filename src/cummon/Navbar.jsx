import React, { useState } from 'react';
import { Button, Form, FormControl, Container, Row, Col, ButtonGroup, ListGroup } from 'react-bootstrap';
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar({ aulas, onBusquedaChange, onAulaSelect, setPisoActual, pisoActual, setHighlightedAulaId, plantas }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
const horaActual = new Date().toTimeString().slice(0, 5); // formato "HH:MM"

  const handleChange = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);
    onBusquedaChange(texto);

    if (texto.length === 0) {
      setResultados([]);
      return;
    }

    const filtro = texto.toLowerCase();
   const filtrados = aulas.filter((aula) => {
  const coincideTexto =
    aula.aula.nombre.toLowerCase().includes(filtro) ||
    aula.materia.nombre.toLowerCase().includes(filtro) ||
    aula.profesor.nombre.toLowerCase().includes(filtro);

  const estaEnHorario =
    aula.horario_inicio <= horaActual && horaActual < aula.horario_fin;

  return coincideTexto && estaEnHorario;
}).slice(0, 5);



    setResultados(filtrados);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

const handleSelect = (aula) => {
  console.log("Seleccionado:", aula.aula.planta.nombre);
  setHighlightedAulaId(aula.aula.nombre);
  setTimeout(() => setHighlightedAulaId(null), 5000);
  setBusqueda("");      // Limpiar el input
  setResultados([]);    // Ocultar sugerencias
  onAulaSelect(aula);   // Mostrar popup con info del aula
  const plantaSeleccionada = plantas.find(p => p._id === aula.aula.planta);
setPisoActual(plantaSeleccionada.nombre);
console.log(plantaSeleccionada.nombre);
};

  const handlePisoClick = (piso) => {
    console.log("Piso seleccionado:", piso);
  };

  return (
    <div className="navbar-content" style={{ position: 'relative' }}>
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          <Col xs={12} md="auto">
            <Form className="d-flex" onSubmit={handleSubmit} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Buscar aula, materia o profesor"
                className="me-2"
                value={busqueda}
                onChange={handleChange}
              />
              <Button type="submit" variant="primary">Buscar</Button>
            </Form>

            {/* Lista desplegable de resultados */}
            {resultados.length > 0 && (
              <ListGroup className="autocomplete-list">
                {resultados.map((aula, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handleSelect(aula)}
                  >
                    <strong>{aula.aula.nombre}</strong> - {aula.materia.nombre} - {aula.profesor.nombre}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col xs="auto">
         <ButtonGroup>
  {["Subsuelo", "Planta Baja", "Piso 1", "Piso 2"].map((piso, idx) => (
    <Button
      key={idx}
      variant={pisoActual === piso ? "primary" : "light"} // cambia el color según si es el piso actual
      onClick={() => setPisoActual(piso)}
    >
      {piso}
    </Button>
  ))}
</ButtonGroup>
          </Col>
          <Col><Link to="/crear-clase" className="btn btn-success mx-2">
  Crear Clase
</Link></Col>
 <Col><Link to="/modificar-clase" className="btn btn-warning mx-2">
  Modificar Clase
</Link></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Navbar;
