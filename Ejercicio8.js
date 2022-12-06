class Ejercicio8 {
    constructor() {
        this.apikey = "3eeca4c2940a47a8fccea4bb8fcae7e0";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.mostrado = false;
    }

    mostrar() {
        if (!this.mostrado) {
            this.recibirJSON("Oviedo", "ES");
            this.recibirJSON("Gijón", "ES");
            this.recibirJSON("Madrid", "ES");
            this.recibirJSON("Mieres", "ES");
            this.recibirJSON("Avilés", "ES");
            this.mostrado = true;
        }
    }

    recibirJSON(ciudad, codigoPais) {
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (datos) {


                var str = "<section>";
                str += "<h2>Ciudad:" + datos.name + "</h2>\n";
                str += "<ul>\n";
                str += "<li><img alt=\"icono del tiempo en " + datos.name + "\" src=\"https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png\"></img></li>\n";
                str += "<li>País: " + datos.sys.country + "</li>\n";
                str += "<li>Latitud: " + datos.coord.lat + " grados</li>\n";
                str += "<li>Longitud: " + datos.coord.lon + " grados</li>\n";
                str += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>\n";
                str += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>\n";
                str += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>\n";
                str += "<li>Presión: " + datos.main.pressure + " milibares</li>\n";
                str += "<li>Humedad: " + datos.main.humidity + " %</li>\n";
                str += "<li>Amanece a las: " + new Date(datos.sys.sunrise * 1000).toLocaleTimeString() + "</li>\n";
                str += "<li>Oscurece a las: " + new Date(datos.sys.sunset * 1000).toLocaleTimeString() + "</li>\n";
                str += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>\n";
                str += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>\n";
                str += "<li>Hora de la medida: " + new Date(datos.dt * 1000).toLocaleTimeString() + "</li>\n";
                str += "<li>Fecha de la medida: " + new Date(datos.dt * 1000).toLocaleDateString() + "</li>\n";
                str += "<li>Descripción: " + datos.weather[0].description + "</li>\n";
                str += "<li>Visibilidad: " + datos.visibility + " metros</li>\n";
                str += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>\n</section>\n";

                $(str).appendTo("main");
               
            },
            error: function () {
                $("main").append("<p> Ha habido un problema consiguiendo los datos de la api.");
            }
        });
    }

}

var ej8 = new Ejercicio8();