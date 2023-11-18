class Persona
{
    constructor(id, nombre, apellido, edad)
    {
        this.id = id;
        this.SetNombre(nombre);
        this.SetApellido(apellido);
        this.SetEdad(edad);
    }

    SetNombre(nombre)
    {
        if (typeof nombre === 'string' && nombre !== "")
            this.nombre = nombre;
        else
            throw new Error("El nombre no puede ser un string vacio");
    }

    SetApellido(apellido)
    {
        if (typeof apellido === 'string' && apellido !== "")
            this.apellido = apellido;
        else
            throw new Error("El apellido no puede ser un string vacio");
    }

    SetEdad(edad)
    {
        let edadAux = edad;
        if (!Number.isInteger(edadAux))
            edadAux = parseInt(edadAux);
        if (!isNaN(edadAux) && edadAux > 15)
            this.edad = edad;
        else
            throw new Error("Velocidad Maxima invalida");
    }
    
    

    toString()
    {
        var mensaje = "Id: " + this.id.toString() + "\n";
        mensaje += "nombre: " + this.nombre + "\n";
        mensaje += "apellido: " + this.apellido + "\n";
        mensaje += "edad: " + this.edad.toString();
        return mensaje;
    }
}



class Futbolista extends Persona
{
    constructor(id, nombre, apellido, edad, equipo, posicion, cantidadGoles)
    {
        super(id, nombre, apellido, edad);
        this.SetEquipo(equipo);
        this.SetPosicion(posicion);
        this.SetCantidadGoles(cantidadGoles);
    }

    SetEquipo(equipo)
    {
        if (typeof equipo === 'string' && equipo !== "")
            this.equipo = equipo;
        else
            throw new Error("El equipo no puede ser un string vacio");
    }
    
    SetPosicion(posicion)
    {
        if (typeof posicion === 'string' && posicion !== "")
            this.posicion = posicion;
        else
            throw new Error("La posicion no puede ser un string vacio");
    }

    SetCantidadGoles(cantidadGoles)
    {
        let cantidadGolesAux = cantidadGoles;
        if (!Number.isInteger(cantidadGolesAux))
            cantidadGolesAux = parseInt(cantidadGolesAux);
        if (!isNaN(cantidadGolesAux) && cantidadGolesAux > -1)
            this.cantidadGoles = cantidadGoles;
        else
            throw new Error("Cantidad de Goles invalida");
    }

    toString()
    {
        var mensaje = super.toString();
        mensaje += "\nposicion: " + this.posicion.toString() +  "\n";
        mensaje += "cantidadGoles: " + this.cantidadGoles.toString();
        return mensaje;
    }

}



class Profesional extends Persona
{
    constructor(id, nombre, apellido, edad, titulo, facultad, añoGraduacion)
    {
        super(id, nombre, apellido, edad);
        this.SetTitulo(titulo);
        this.SetFacultad(facultad);
        this.SetAñoGraduacion(añoGraduacion);

    }

    SetTitulo(titulo)
    {
        if (typeof titulo === 'string' && titulo !== "")
            this.titulo = titulo;
        else
            throw new Error("El titulo no puede ser un string vacio");
    }

    SetFacultad(facultad)
    {
        if (typeof facultad === 'string' && facultad !== "")
            this.facultad = facultad;
        else
            throw new Error("La facultad no puede ser un string vacio");
    }

    SetAñoGraduacion(añoGraduacion)
    {
        let añoGraduacionAux = añoGraduacion;
        if (!Number.isInteger(añoGraduacionAux))
            añoGraduacionAux = parseInt(añoGraduacionAux);
        if (!isNaN(añoGraduacionAux) && añoGraduacionAux > 1950)
            this.añoGraduacion = añoGraduacion;
        else
            throw new Error("Año de Graduacion invalido");
    }
    

    toString()
    {
        var mensaje = super.toString();
        mensaje += "\ntitulo: " + this.titulo.toString() +  "\n";
        mensaje += "facultad: " + this.facultad.toString();
        return mensaje;
    }
}


function CargarDatos()
{
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // La solicitud se completó correctamente
            dataJSON = xhr.responseText;
            data_parsed = JSON.parse(dataJSON);
            console.log(data_parsed);
            
            
            form_datos.hidden = false;
            loader.hidden = true;
            let nuevapersona;
    
            
    
            for (let dato of data_parsed)
            {
                
                if (dato.equipo)
                {
                    nuevapersona = new Futbolista(dato.id, dato.nombre, dato.apellido,dato.edad, dato.equipo, dato.posicion, dato.cantidadGoles);
                }
                else if (dato.facultad)
                {
                    nuevapersona = new Profesional(dato.id, dato.nombre, dato.apellido, dato.edad, dato.titulo, dato.facultad, dato.añoGraduacion);
                }
                personas.push(nuevapersona);
            }
            ActualizarTabla();
        }
    };
    xhr.send();
}
let loader = document.getElementById("loader-container");
let form_datos = document.getElementById("form-datos");
let form_abm = document.getElementById("form-agregar");
let dataJSON;
var url = 'http://localhost/2023/SP-Labo/personasFutbolitasProfesionales.php'; 
let data_parsed;
let personas = [];
let claves = ["id", "nombre", "apellido", "edad", "equipo", "cantidadGoles", "posicion", "titulo", "facultad", "añoGraduacion"];

CargarDatos();







function vaciar(elemento)
{
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function Mostrarpersonas(personas)
{
    row_index = 1
    
    const tabla_personas_body = document.getElementById("t-user-body");
    vaciar(tabla_personas_body);
    let text_col;
    let col;
    let txt_col_node;
    let row;
    var boton_entrar_modificar;
    var boton_entrar_eliminar;
    for (let persona of personas)
    {
        row = document.createElement("tr");
        row_head = document.createElement("th");
        text = document.createTextNode(row_index);
        row_head.appendChild(text);
        row.appendChild(row_head);

        for (let clave of claves)
        {
            if(persona[clave] !== undefined)
            {
                text_col = persona[clave];
            }
            else
            {
                text_col = "N/A"
            }
            txt_col_node = document.createTextNode(text_col)
            col = document.createElement("td");
            col.appendChild(txt_col_node);
            row.appendChild(col);
        }
        col = document.createElement("td");
        boton_entrar_modificar = document.createElement("button");

        boton_entrar_modificar.className = "btn btn-warning";
        boton_entrar_modificar.innerText = "Modificar";
        col.appendChild(boton_entrar_modificar);
        row.appendChild(col);

        col = document.createElement("td");
        boton_entrar_eliminar = document.createElement("button");
        boton_entrar_eliminar.className = "btn btn-warning";
        boton_entrar_eliminar.innerText = "Eliminar";
        col.appendChild(boton_entrar_eliminar);
        row.appendChild(col);

        boton_entrar_modificar.addEventListener("click", (e) => {
            e.preventDefault();
            MostrarModificar(persona)
        });
        boton_entrar_eliminar.addEventListener("click", (e) => {
            e.preventDefault();
            MostrarEliminar(persona);

        });
        tabla_personas_body.appendChild(row);
        row_index += 1;
    }
}

function MostrarAgregar()
{
    const formulario_datos = document.getElementById("form-datos");
    const formulario_agregar = document.getElementById("form-agregar");
    const txt_id = document.getElementById("txt-id");
    const txt_nombre = document.getElementById("txt-nombre");
    const txt_apellido = document.getElementById("txt-apellido");
    const txt_edad = document.getElementById("txt-edad");
    const txt_equipo = document.getElementById("txt-equipo");
    const txt_posicion = document.getElementById("txt-posicion");
    const txt_cantidadGoles = document.getElementById("txt-cantidadGoles");
    const txt_titulo = document.getElementById("txt-titulo");
    const txt_facultad = document.getElementById("txt-facultad");
    const txt_añoGraduacion = document.getElementById("txt-añoGraduacion");
    const select_tipo = document.getElementById("select-tipo");
    

    formulario_datos.hidden = true;
    formulario_agregar.hidden = false;

    const btn_modificar = document.getElementById("btn-modificar");
    const btn_eliminar = document.getElementById("btn-eliminar");
    const btn_agregar = document.getElementById("btn-agregar");

    const div_id = document.getElementById("div-id");

    txt_id.value = "";

    txt_nombre.value = "";
    txt_apellido.value = "";
    txt_edad.value = "";
    txt_equipo.value = "";
    txt_posicion.value = "";
    txt_cantidadGoles.value = "";
    txt_titulo.value = "";
    txt_facultad.value = "";
    txt_añoGraduacion.value = "";
    
    txt_nombre.disabled = false;
    txt_apellido.disabled = false;
    txt_edad.disabled = false;
    txt_equipo.disabled = false;
    txt_posicion.disabled = false;
    txt_cantidadGoles.disabled = false;
    txt_titulo.disabled = false;
    txt_facultad.disabled = false;
    txt_añoGraduacion.disabled = false;

    select_tipo.disabled = false;
    div_id.hidden = true;
    btn_modificar.hidden = true;
    btn_eliminar.hidden = true;

    btn_agregar.hidden = false;

}


async function Agregar() {
    form_abm.hidden = true;
    loader.hidden = false;
    
    const nombre = document.getElementById("txt-nombre").value;
    const apellido = document.getElementById("txt-apellido").value;
    const edad = document.getElementById("txt-edad").value;
    const equipo = document.getElementById("txt-equipo").value;
    const posicion = document.getElementById("txt-posicion").value;
    const cantidadGoles = document.getElementById("txt-cantidadGoles").value;
    const titulo = document.getElementById("txt-titulo").value;
    const facultad = document.getElementById("txt-facultad").value;
    const añoGraduacion = document.getElementById("txt-añoGraduacion").value;
    const tipo = document.getElementById("select-tipo").value;

    return new Promise(async (resolve, reject) => {
        let nuevaPersona;
        try {
            if (tipo == "futbolista")
            {
                nuevaPersona = new Futbolista(2, nombre, apellido, edad, equipo, posicion, cantidadGoles);
            }
            else
            {
                nuevaPersona = new Profesional(2, nombre, apellido, edad, titulo, facultad, añoGraduacion);
            }
            options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(nuevaPersona),
            }
            const response = await fetch(url, options);
    
            if (!response.ok) {
            throw new Error('No se pudo completar la solicitud');
            }

            personas.push(nuevaPersona);
            console.log('Respuesta exitosa:', response.text);
            loader.hidden = true
            ActualizarTabla();
            MostrarDatos();
            mensaje = "El persona se ha agregado correctamente";
            resolve(mensaje);
        } 
        catch (error) {
            mensaje = "Error: " + error.message;
            loader.hidden = true;
            form_abm.hidden = false;
            reject(error);
        }
    });
}


function Modificar(persona)
{
    form_abm.hidden = true;
    loader.hidden = false;
    let nombre_anterior = persona.nombre;
    let apellido_anterior = persona.apellido;
    let mensaje = "Error en la request";
    if (persona instanceof Futbolista)
    {
        edad_anterior = persona.edad;
        posicion_anterior = persona.nombre;
        cantidadGoles_anterior = persona.cantidadGoles;
    }
    else
    {
        titulo_anterior = persona.titulo;
        facultad_anterior = persona.facultad;
        añoGraduacion_anterior = persona.añoGraduacion;
        
    }
    try
    {
        let edad_anterior;
        let posicion_anterior;
        let cantidadGoles_anterior;

        let titulo_anterior;
        let facultad_anterior;
        let añoGraduacion_anterior;
        

        const nombre = document.getElementById("txt-nombre").value;
        const apellido = document.getElementById("txt-apellido").value;
        const edad = document.getElementById("txt-edad").value;
        const equipo = document.getElementById("txt-equipo").value;
        const posicion = document.getElementById("txt-posicion").value;
        const cantidadGoles = document.getElementById("txt-cantidadGoles").value;
        const titulo = document.getElementById("txt-titulo").value;
        const facultad = document.getElementById("txt-facultad").value;
        const añoGraduacion = document.getElementById("txt-añoGraduacion").value;

        nombrepersona = persona.nombre;
        persona.SetNombre(nombre);
        persona.SetApellido(apellido);
        persona.SetEdad(edad);
        if (persona instanceof Futbolista)
        {
            persona.SetPosicion(posicion);
            persona.SetEquipo(equipo);
            persona.SetCantidadGoles(cantidadGoles);
            edad_anterior = persona.edad;
            posicion_anterior = persona.nombre;
            cantidadGoles_anterior = persona.cantidadGoles;
        }
        else if(persona instanceof Profesional)
        {
            persona.SetTitulo(titulo);
            persona.SetFacultad(facultad);
            persona.SetAñoGraduacion(añoGraduacion);

            titulo_anterior = persona.titulo;
            facultad_anterior = persona.facultad;
            añoGraduacion_anterior = persona.añoGraduacion;
            
        }
          
        const response = fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona),
        })
        .then(response => {
            if (!response.ok) {
                // console.log(response);
                throw new Error(`Error en la solicitud`);
            }
            return response;
        })
        .then(response => {
            console.log(JSON.stringify(persona));
            ActualizarTabla();
            MostrarDatos();
            mensaje = "El persona se ha modificado correctamente";
            alert(mensaje);
            loader.hidden = true;
        })
        .catch(error => {
            loader.hidden = true;
            form_abm.hidden = false;
            mensaje = "Error " + error.message;
            console.error("Error " + error.message);
            alert(mensaje);

            persona.SetNombre(nombre_anterior);
            persona.SetApellido(apellido_anterior);

            if (persona instanceof Futbolista)
            {
                persona.SetEdad(edad_anterior);
                persona.SetPosicion(posicion_anterior);
                persona.SetCantidadGoles(cantidadGoles_anterior);
            }
            else
            {
                persona.SetTitulo(titulo_anterior);
                persona.SetFacultad(facultad_anterior);
                persona.SetAñoGraduacion(añoGraduacion_anterior);
                
            }
        });
    }
    catch(error)
    {
        form_abm.hidden = false;
        mensaje = "Error: " + error.message;
        alert(mensaje);
        persona.SetNombre(nombre_anterior);
        persona.SetApellido(apellido_anterior);

        if (persona instanceof Futbolista)
        {

            persona.SetEdad(edad_anterior);
            persona.SetPosicion(posicion_anterior);
            persona.SetCantidadGoles(cantidadGoles_anterior);
        }
        else
        {
            persona.SetTitulo(titulo_anterior);
            persona.SetFacultad(facultad_anterior);
            persona.SetAñoGraduacion(añoGraduacion_anterior);
            
        }
    }
    
}

async function modificarObjeto(objeto) {
    try {
      const response = await fetch('http://localhost/2023/SP-Labo/personasFutbolitasProfesionales.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objeto),
      });
  
      if (!response.ok) {
        throw new Error('No se pudo completar la solicitud');
      }
  
      const data = await response.text();
      console.log(data); // Aquí puedes hacer algo con la respuesta del servidor
    } catch (error) {
      console.error('Error en la solicitud: ', error.message);
    }
}

function Eliminar(id) {
    form_abm.hidden = true;
    loader.hidden = false
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
  
        const data = await response.text();
        mensaje = "Se ha eliminado la persona";
        personas = personas.filter(persona => persona.id !== id);
        loader.hidden = true
        ActualizarTabla();
        MostrarDatos();
        resolve(mensaje);
  
      } catch (error) {
        form_abm.hidden = false;
        loader.hidden = true;
        reject(new Error(`Error en la solicitud: ${error.message}`));
      }
    });
  }

function EliminarTodosLosEventos(elemento) {
    const copiaElemento = elemento.cloneNode(true);
    elemento.parentNode.replaceChild(copiaElemento, elemento);
    return copiaElemento;
}

function MostrarModificar(persona)
{
    const formulario_datos = document.getElementById("form-datos");
    const formulario_agregar = document.getElementById("form-agregar");
    formulario_datos.hidden = true;
    formulario_agregar.hidden = false;

    const txt_id = document.getElementById("txt-id");
    const txt_nombre = document.getElementById("txt-nombre");
    const txt_apellido = document.getElementById("txt-apellido");
    const txt_edad = document.getElementById("txt-edad");
    const txt_equipo = document.getElementById("txt-equipo");
    const txt_posicion = document.getElementById("txt-posicion");
    const txt_cantidadGoles = document.getElementById("txt-cantidadGoles");
    const txt_titulo = document.getElementById("txt-titulo");
    const txt_facultad = document.getElementById("txt-facultad");
    const txt_añoGraduacion = document.getElementById("txt-añoGraduacion");
    const select_tipo = document.getElementById("select-tipo");

    txt_id.value = persona.id;
    txt_nombre.value = persona.nombre;
    txt_apellido.value = persona.apellido;
    txt_edad.value = persona.edad;
    let tipo;
    if (persona instanceof Futbolista)
    {
        tipo = "futbolista";
        txt_equipo.value = persona.equipo;
        txt_cantidadGoles.value = persona.cantidadGoles;
        txt_posicion.value = persona.posicion;

        txt_titulo.value = "";
        txt_facultad.value = "";
        txt_añoGraduacion.value = "";
    }
    else
    {
        tipo = "profesional"
        txt_titulo.value = persona.titulo;
        txt_facultad.value = persona.facultad;
        txt_añoGraduacion.value = persona.añoGraduacion;

        txt_cantidadGoles.value = "";
        txt_posicion.value = "";
        txt_equipo.value = "";
    }
    select_tipo.value = tipo;
    SetTipo(tipo);
    select_tipo.disabled = true;
    txt_nombre.disabled = false;
    txt_apellido.disabled = false;
    txt_edad.disabled = false;
    txt_equipo.disabled = false;
    txt_posicion.disabled = false;
    txt_cantidadGoles.disabled = false;
    txt_titulo.disabled = false;
    txt_facultad.disabled = false;
    txt_añoGraduacion.disabled = false;


    let btn_modificar = document.getElementById("btn-modificar");
    let btn_eliminar = document.getElementById("btn-eliminar");
    const btn_agregar = document.getElementById("btn-agregar");

    btn_modificar = EliminarTodosLosEventos(btn_modificar);
    btn_eliminar = EliminarTodosLosEventos(btn_eliminar);

    const div_id = document.getElementById("div-id");

    div_id.hidden = false;
    btn_modificar.hidden = false;
    btn_eliminar.hidden = true;

    btn_agregar.hidden = true;

    btn_modificar.addEventListener("click", (e) => {
        e.preventDefault();
        Modificar(persona);
    });
}

function MostrarEliminar(persona)
{
    const formulario_datos = document.getElementById("form-datos");
    const formulario_agregar = document.getElementById("form-agregar");
    formulario_datos.hidden = true;
    formulario_agregar.hidden = false;

    const txt_id = document.getElementById("txt-id");
    const txt_nombre = document.getElementById("txt-nombre");
    const txt_apellido = document.getElementById("txt-apellido");
    const txt_edad = document.getElementById("txt-edad");
    const txt_equipo = document.getElementById("txt-equipo");
    const txt_posicion = document.getElementById("txt-posicion");
    const txt_cantidadGoles = document.getElementById("txt-cantidadGoles");
    const txt_titulo = document.getElementById("txt-titulo");
    const txt_facultad = document.getElementById("txt-facultad");
    const txt_añoGraduacion = document.getElementById("txt-añoGraduacion");
    const select_tipo = document.getElementById("select-tipo");



    txt_id.value = persona.id;
    txt_nombre.value = persona.nombre;
    txt_apellido.value = persona.apellido;
    txt_edad.value = persona.edad;
    let tipo;

    if (persona instanceof Futbolista)
    {
        tipo = "futbolista";
        txt_equipo.value = persona.equipo;
        txt_cantidadGoles.value = persona.cantidadGoles;
        txt_posicion.value = persona.posicion;

        txt_titulo.value = "";
        txt_facultad.value = "";
        txt_añoGraduacion.value = "";
    }
    else
    {
        tipo = "profesional"
        txt_titulo.value = persona.titulo;
        txt_facultad.value = persona.facultad;
        txt_añoGraduacion.value = persona.añoGraduacion;

        txt_cantidadGoles.value = "";
        txt_posicion.value = "";
        txt_equipo.value = "";
    }
    select_tipo.value = tipo;
    SetTipo(tipo);
    select_tipo.disabled = true;
    txt_nombre.disabled = true;
    txt_apellido.disabled = true;
    txt_edad.disabled = true;
    txt_equipo.disabled = true;
    txt_posicion.disabled = true;
    txt_cantidadGoles.disabled = true;
    txt_titulo.disabled = true;
    txt_facultad.disabled = true;
    txt_añoGraduacion.disabled = true;
    select_tipo.disabled = true;


    let btn_modificar = document.getElementById("btn-modificar");
    let btn_eliminar = document.getElementById("btn-eliminar");
    const btn_agregar = document.getElementById("btn-agregar");

    btn_eliminar = EliminarTodosLosEventos(btn_eliminar);

    const div_id = document.getElementById("div-id");

    div_id.hidden = false;
    btn_modificar.hidden = true;
    btn_eliminar.hidden = false;

    btn_agregar.hidden = true;

    btn_eliminar.addEventListener("click", (e) => {
        e.preventDefault();
        Eliminar(persona.id)
        .then(mensaje => alert(mensaje))
        .catch(error => alert(error));
    });
}

function MostrarDatos()
{
    const formulario_datos = document.getElementById("form-datos");
    const formulario_agregar = document.getElementById("form-agregar");
    formulario_datos.hidden = false;
    formulario_agregar.hidden = true;
}

function ObtenerProximoId(personas)
{
    let id = 1;
    for (let persona of personas)
    {
        if (persona.id >= id)
        {
            id = persona.id + 1;
        }
    }
    return id;
}

function ActualizarTabla()
{
    Mostrarpersonas(personas, personas);
}

function SetTipo(tipo)
{
    const div_equipo = document.getElementById("div-equipo");
    const div_posicion = document.getElementById("div-posicion");
    const div_cantidadGoles = document.getElementById("div-cantidadGoles");
    const div_titulo = document.getElementById("div-titulo");
    const div_facultad = document.getElementById("div-facultad");
    const div_añoGraduacion = document.getElementById("div-añoGraduacion");
    if (tipo == "futbolista")
    {
        div_equipo.hidden = false;
        div_posicion.hidden = false;
        div_cantidadGoles.hidden = false;
        div_titulo.hidden = true;
        div_facultad.hidden = true;
        div_añoGraduacion.hidden = true;
    }
    else
    {
        div_equipo.hidden = true;
        div_posicion.hidden = true;
        div_cantidadGoles.hidden = true;
        div_titulo.hidden = false;
        div_facultad.hidden = false;
        div_añoGraduacion.hidden = false;
    }
}

window.addEventListener("load", () => {
    ActualizarTabla();
});


const btn_mostrar_agregar = document.getElementById("btn-mostrar-agregar");
btn_mostrar_agregar.addEventListener("click", (e) => {
    e.preventDefault();
    MostrarAgregar();
});

const formulario_datos = document.getElementById("form-datos");

const btn_cancelar = document.getElementById("btn-cancelar");
btn_cancelar.addEventListener("click", (e) => {
    e.preventDefault();
    MostrarDatos();
});

const btn_agregar = document.getElementById("btn-agregar");
btn_agregar.addEventListener("click", (e) => {
    e.preventDefault();
    Agregar()
    .then(mensaje => alert(mensaje))
    .catch(error => {
        console.error(error);
        alert("Error: " + error.message);
    });
});


let t_head;
for (let clave of claves)
{
    t_head = document.getElementById("t-head-" + clave);
    t_head.addEventListener("click", () => {
        personas.sort((a, b) => a[clave] - b[clave]);
        ActualizarTabla();
    });
}






const select_tipo = document.getElementById("select-tipo");
select_tipo.addEventListener("change", (e)=>{SetTipo(select_tipo.value)});