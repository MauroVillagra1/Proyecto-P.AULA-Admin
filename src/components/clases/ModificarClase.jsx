import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

function ModificarClase() {
  const [clases, setClases] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  const [materias, setMaterias] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [comisiones, setComisiones] = useState([]);

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  useEffect(() => {
    obtenerClases();
    obtenerDatosSelects();
  }, []);

  const obtenerClases = async () => {
    try {
      const res = await axios.get("https://p-aula-back-29ln.vercel.app/api/clase");
      setClases(res.data);
    } catch (err) {
      console.error("Error al traer clases", err);
    }
  };

  const obtenerDatosSelects = async () => {
    try {
      const [resMaterias, resAulas, resProfesores, resComisiones] = await Promise.all([
        axios.get("https://p-aula-back-29ln.vercel.app/api/materia"),
        axios.get("https://p-aula-back-29ln.vercel.app/api/aula"),
        axios.get("https://p-aula-back-29ln.vercel.app/api/profesor"),
        axios.get("https://p-aula-back-29ln.vercel.app/api/comision"),
      ]);

      setMaterias(resMaterias.data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      setAulas(resAulas.data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      setProfesores(resProfesores.data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      setComisiones(resComisiones.data.sort((a, b) =>
        `${a.año} ${a.numero}`.localeCompare(`${b.año} ${b.numero}`)
      ));
    } catch (error) {
      console.error("Error al obtener datos de selects", error);
    }
  };

  const editarClase = (clase) => {
    setClaseSeleccionada({
      ...clase,
      materia: clase.materia?._id || "",
      aula: clase.aula?._id || "",
      profesor: clase.profesor?._id || "",
      comision: clase.comision?._id || "",
    });
    setMostrarModal(true);
  };

  const handleChange = (e) => {
    setClaseSeleccionada({ ...claseSeleccionada, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      await axios.put(
        `https://p-aula-back-29ln.vercel.app/api/clase/${claseSeleccionada._id}`,
        claseSeleccionada
      );
      setMostrarModal(false);
      obtenerClases();
    } catch (err) {
      console.error("Error al actualizar clase", err);
    }
  };

  const eliminarClase = async (id) => {
    if (window.confirm("¿Seguro que querés eliminar esta clase?")) {
      try {
        await axios.delete(`https://p-aula-back-29ln.vercel.app/api/clase/${id}`);
        obtenerClases();
      } catch (error) {
        console.error("Error al eliminar clase", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Modificar Clases</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Materia</th>
            <th>Profesor</th>
            <th>Aula</th>
            <th>Comisión</th>
            <th>Día</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase._id}>
              <td>{clase.materia?.nombre}</td>
              <td>{clase.profesor?.nombre}</td>
              <td>{clase.aula?.nombre}</td>
              <td>{clase.comision?.año} - {clase.comision?.numero}</td>
              <td>{clase.dia}</td>
              <td>{clase.horario_inicio} - {clase.horario_fin}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => editarClase(clase)}>Editar</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => eliminarClase(clase._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {claseSeleccionada && (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Materia</Form.Label>
                <Form.Select name="materia" value={claseSeleccionada.materia} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {materias.map((m) => (
                    <option key={m._id} value={m._id}>{m.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Profesor</Form.Label>
                <Form.Select name="profesor" value={claseSeleccionada.profesor} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {profesores.map((p) => (
                    <option key={p._id} value={p._id}>{p.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Aula</Form.Label>
                <Form.Select name="aula" value={claseSeleccionada.aula} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {aulas.map((a) => (
                    <option key={a._id} value={a._id}>{a.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Comisión</Form.Label>
                <Form.Select name="comision" value={claseSeleccionada.comision} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {comisiones.map((c) => (
                    <option key={c._id} value={c._id}>{c.año} - {c.numero}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Día</Form.Label>
                <Form.Select name="dia" value={claseSeleccionada.dia} onChange={handleChange}>
                  <option value="">Seleccionar día</option>
                  {diasSemana.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Hora de Inicio</Form.Label>
                <Form.Control
                  type="time"
                  name="horario_inicio"
                  value={claseSeleccionada.horario_inicio}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Hora de Fin</Form.Label>
                <Form.Control
                  type="time"
                  name="horario_fin"
                  value={claseSeleccionada.horario_fin}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={guardarCambios}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModificarClase;
