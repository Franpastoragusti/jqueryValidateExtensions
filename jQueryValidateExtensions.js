

$().ready(function() {


    //Validar con Expresiones Regulares
    $.validator.addMethod("regx", function(value, element, regexpr) {
        return regexpr.test(value);
    }, "Please enter a valid pasword.");


    //Validar un Cif
    $.validator.addMethod("cif", function(value, element) {
        var pares = 0;
        var impares = 0;
        var suma;
        var ultima;
        var unumero;
        var uletra = new Array("J", "A", "B", "C", "D", "E", "F", "G", "H", "I");
        var xxx;
        texto = value.toUpperCase();
        var regular = new RegExp(/^[ABCDEFGHKLMNPQS]\d\d\d\d\d\d\d[0-9,A-J]$/g);
        if (!regular.exec(texto)) return false;

        ultima = texto.substr(8,1);

        for (var cont = 1 ; cont < 7 ; cont ++){
            xxx = (2 * parseInt(texto.substr(cont++,1))).toString() + "0";
            impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1));
            pares += parseInt(texto.substr(cont,1));
        }
        xxx = (2 * parseInt(texto.substr(cont,1))).toString() + "0";
        impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1));

        suma = (pares + impares).toString();
        unumero = parseInt(suma.substr(suma.length - 1, 1));
        unumero = (10 - unumero).toString();
        if(unumero == 10) unumero = 0;

        if ((ultima == unumero) ||  (ultima == uletra[unumero]))
            return true;
        else
            return false;
    }, "Por favor inserta un Cif válido.");


    //Validar un NIE
    $.validator.addMethod("nie", function(value, element) {
        value = value.toUpperCase();
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }
        if (/^[T]{1}/.test(value)) {
            return (value[8] === /^[T]{1}[A-Z0-9]{8}$/.test(value));
        }
        if (/^[XYZ]{1}/.test(value)) {
            return (value[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.replace('X', '0').replace('Y', '1').replace('Z', '2').substring(0, 8) % 23));
        }
        
        return false;

    }, "Por favor inserta un Cif válido.");

});
