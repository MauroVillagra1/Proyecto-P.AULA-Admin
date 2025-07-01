import { useState, useEffect } from "react";
import axios from "axios";

function CrearClase() {
  const [datos, setDatos] = useState({
    aula: "",
    profesor: "",
    comision: "",
    materia: "",
    dia: "",
    horario_inicio: "",
    horario_fin: ""
  });

  const [materias, setMaterias] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [comisiones, setComisiones] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'success' o 'danger'

 useEffect(() => {
  const fetchDatos = async () => {
    try {
        const [resMaterias, resAulas, resProfesores, resComisiones] =
          await Promise.all([
            axios.get("https://p-aula-back-29ln.vercel.app/api/materia"),
            axios.get("https://p-aula-back-29ln.vercel.app/api/aula"),
            axios.get("https://p-aula-back-29ln.vercel.app/api/profesor"),
            axios.get("https://p-aula-back-29ln.vercel.app/api/comision"),
          ]);

      // Ordenar alfabéticamente por nombre, año, número, etc.
      const materiasOrdenadas = resMaterias.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      const aulasOrdenadas = resAulas.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      const profesoresOrdenados = resProfesores.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      const comisionesOrdenadas = resComisiones.data.sort((a, b) =>
        `${a.año} ${a.numero}`.localeCompare(`${b.año} ${b.numero}`)
      );

      setMaterias(materiasOrdenadas);
      setAulas(aulasOrdenadas);
      setProfesores(profesoresOrdenados);
      setComisiones(comisionesOrdenadas);
    } catch (err) {
      console.error("Error al traer datos del formulario", err);
    }
  };

  fetchDatos();
}, []);


  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://p-aula-back-29ln.vercel.app/api/clase", datos);
      setMensaje("✅ Clase creada con éxito.");
      setTipoMensaje("success");

      // Limpiar formulario
      setDatos({
        materia: "",
        aula: "",
        dia: "",
        horaInicio: "",
        horaFin: "",
        comision: "",
        profesor: "",
      });
    } catch (error) {
      console.error("Error al crear clase", error);
      setMensaje("❌ Hubo un error al crear la clase.");
      setTipoMensaje("danger");
    }

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 5000);
  };

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div className="container mt-4">
      <h2>Crear Nueva Clase</h2>

      {mensaje && (
        <div className={`alert alert-${tipoMensaje}`} role="alert">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Materia</label>
          <select
            className="form-control"
            name="materia"
            value={datos.materia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar materia</option>
            {materias.map((m) => (
              <option key={m._id} value={m._id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Comisión</label>
          <select
            className="form-control"
            name="comision"
            value={datos.comision}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar comisión</option>
            {comisiones.map((c) => (
              <option key={c._id} value={c._id}>
                {c.año} - {c.numero}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Profesor</label>
          <select
            className="form-control"
            name="profesor"
            value={datos.profesor}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar profesor</option>
            {profesores.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Aula</label>
          <select
            className="form-control"
            name="aula"
            value={datos.aula}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar aula</option>
            {aulas.map((a) => (
              <option key={a._id} value={a._id}>
                {a.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Día</label>
          <select
            className="form-control"
            name="dia"
            value={datos.dia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar día</option>
            {diasSemana.map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Hora de Inicio</label>
         <input
  type="time"
  className="form-control"
  name="horario_inicio"
  value={datos.horario_inicio}
  onChange={handleChange}
  required
/>

        </div>

        <div className="mb-3">
          <label>Hora de Fin</label>
         <input
  type="time"
  className="form-control"
  name="horario_fin"
  value={datos.horario_fin}
  onChange={handleChange}
  required
/>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Clase
        </button>
      </form>
    </div>
  );
}

export default CrearClase;
