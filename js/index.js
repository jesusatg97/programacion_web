// Si bien, esta no es la mejor práctica, te servirá para lo que pide Mario;
// declaramos dos variables "globales" que almacenarán la información del alumno,
// datos personales y el horario; se crea un diccionario para almacenar posteriormente
// datos de la respuesta JSON de la API del profesor

var studentData = {
    code: null,
    name: null,
    career: null,
    campus: null,
}

// Ojo con este dato, ya que es un diccionario de diccionarios; es decir
// cada día tendrá almacenado internamente otro diccionario, por ejemplo:
//
// scheduleData.monday = {
//      0: {nrc: dato, maestro: dato, ...},
//      1: {nrc: dato, maestro: dato, ...},
//      2: {nrc: dato, maestro: dato, ...},
//      etc...
// }
// no forzosamente tendrán esas claves, revísalas en la consola para ver cuáles son
var scheduleData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
}


document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'page1') {
        page.querySelector('#push-button').onclick = function () {
            enviar();
            document.querySelector('#myNavigator').pushPage('page2.html', {
                data: {
                    title: 'Page 2'
                }
            });

        };
    } else if (page.id === 'page2') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
});

function enviar() {
    var codigo = document.getElementById("codigo").value;
    studentData.code = codigo;
    var nip = document.getElementById("pass").value;
    // declarando y obteniendo variables de los input
    // mandando datos al servidor
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(xhttp.responseText); // esta variable lo que almacena es la respuesta de la "API" del profesor
            // Trae consigo un tipo de dato JSON, el cual es parseado para manipularlo con JS

            // De cierta manera, un JSON es un diccionario, el cual está compuesto por datos del tipo clave-valor,
            // por ejemplo, las primeras dos variables declaradas en el documento (studentData y scheduleData)

            // Una vez que retorna la respuesta obj, se le asignan los valores a las variables previamente definidas
            // en los diccionarios a emplear para un manejo más sencillo
            studentData.name = obj["alumno"];
            studentData.career = obj["carrera"];
            studentData.campus = obj["campus"];

            // Como se menciona antes, la variable scheduleData será un diccionario de diccionarios, puesto que
            // el valor de la clave "horario" en obj contiene las materias del alumno (un diccionario de las materias)
            // y cada materia a su vez tiene datos como "aula", "dias", "maestro", etcétera
            // por lo que se recorre el arreglo y se verifica a qué día pertenece la materia
            for (i in obj["horario"]) {
                if (obj["horario"][i].dias.includes("L")) {
                    scheduleData.monday.push(obj["horario"][i]);
                }
                if (obj["horario"][i].dias.includes("M")) {
                    scheduleData.tuesday.push(obj["horario"][i]);
                }
                if (obj["horario"][i].dias.includes("I")) {
                    scheduleData.thursday.push(obj["horario"][i]);
                }
                if (obj["horario"][i].dias.includes("J")) {
                    scheduleData.wednesday.push(obj["horario"][i]);
                }
                if (obj["horario"][i].dias.includes("V")) {
                    scheduleData.friday.push(obj["horario"][i]);
                }
                if (obj["horario"][i].dias.includes("S")) {
                    scheduleData.saturday.push(obj["horario"][i]);
                }
            }

            // Se le sobreescribe a la variable referenciada en HTML por su ID el valor del dato que se quiere poner
            document.getElementById("codigoAlumno").innerHTML = "Código: " + studentData.code;
            document.getElementById("nombreAlumno").innerHTML = "Nombre: " + studentData.name;
            document.getElementById("carreraAlumno").innerHTML = "Carrera: " + studentData.career;
            document.getElementById("campusAlumno").innerHTML = "Campus: " + studentData.campus;
        }
    };
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://dcc.000webhostapp.com/2019B/horario.php?codigo=" + codigo + "&nip=" + nip, true);
    xhttp.send();
}

function dias(day) {
    var promise = new Promise((resolve, reject) => {
        document.querySelector('#myNavigator').pushPage('page3.html', {
            data: {
                title: 'Horario'
            }
        }).then(() => {
            var table = document.getElementById("horario");
            if (day == 'L') {
                let subjects = scheduleData.monday;
                var row = 1;
                for (i in subjects) {
                    var new_row = table.insertRow(row);
                    var cell = 0;

                    for (var key in subjects[i]) {
                        if (subjects[i].hasOwnProperty(key)) {
                            var new_cell = new_row.insertCell(cell);
                            new_cell.innerHTML = subjects[i][key];
                        }
                        cell += 0;
                    }
                    row += 1;
                }
            }
            if (day == 'M') {
                let subjects = scheduleData.tuesday;
                for (i in subjects) {
                    console.log(subjects[i]);
                }
            }
            if (day == 'I') {
                let subjects = scheduleData.wednesday;
                for (i in subjects) {
                    console.log(subjects[i]);
                }
            }
            if (day == 'J') {
                let subjects = scheduleData.thursday;
                for (i in subjects) {
                    console.log(subjects[i]);
                }
            }
            if (day == 'V') {
                let subjects = scheduleData.friday;
                for (i in subjects) {
                    console.log(subjects[i]);
                }
            }
            if (day == 'S') {
                let subjects = scheduleData.saturday;
                for (i in subjects) {
                    console.log(subjects[i]);
                }
            }
        })
    });
}