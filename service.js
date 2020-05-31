exports.querymft = querymft;
exports.descargaPlantillas = descargaPlantillas;
exports.personas = personas;
exports.validaciones = validaciones;

//FUNCIÓN DE CONSULTAS GOANYWHERE
function querymft(query) {
  var query2 = query;
  var respuesta;
  pjs.define("MFT", { type: 'char', length: 1000, varying: true });
  MFT = pjs.sendRequest("get", "https://securetransfer.redsis.com:443/rest/forms/v1/datosSCI/payload");
           MFT = MFT.scanReplace('{"data":{"payloadId":"','');
           pos = MFT.scan('","');
           MFT = String.setLength(MFT, pos-1);
           console.log("PAYLOAD: "+ MFT);
           var body = pjs.sendRequest({
              method: "POST",
              uri: "https://securetransfer.redsis.com:443/rest/forms/v1/datosSCI/payload/"+MFT+"/submit",
              body: {
              "consulta" : query.toString(),
           },
              json: true,
              timeout: 15000,
              time: true
            });
           respuesta = JSON.parse(body.data.message.toString());
           return respuesta;
}
//FUNCIÓN DE DESCARGA DE PLANTILLAS
function descargaPlantillas(ce,urgencias,quirurgico,hospitalizacion, temprana, transporte, otros, apoyo, imagenes,  sedes) {
  var idFile;
  var respuesta;
  pjs.define("MFT", { type: 'char', length: 1000, varying: true });
  MFT = pjs.sendRequest("get", "https://securetransfer.redsis.com:443/rest/forms/v1/plantillasSCI/payload");
           MFT = MFT.scanReplace('{"data":{"payloadId":"','');
           pos = MFT.scan('","');
           MFT = String.setLength(MFT, pos-1);
           console.log("PAYLOAD DESCARGA: "+ MFT);
           var body = pjs.sendRequest({
              method: "POST",
              uri: "https://securetransfer.redsis.com:443/rest/forms/v1/plantillasSCI/payload/"+MFT+"/submit",
              body: {
              "consulta_externa" : ce.toString(),
              "urgencias": urgencias.toString(),
              "quirurgico": quirurgico.toString(),
              "hospitalizacion": hospitalizacion.toString(),
              "temprana": temprana.toString(),
              "transporte": transporte.toString(),
              "otros": otros.toString(),
              "apoyo": apoyo.toString(),
              "imagenes": imagenes.toString(),
              "sedes": sedes.toString()
           },
              json: true,
              timeout: 15000,
              time: true
            });
            var i = 0;
}
//FUNCIÓN CONSUMO SERVICIO PERSONAS
function personas(tipoDocumento, numeroIdentificacion) {
   var respuesta;
   pjs.define("MFT", { type: 'char', length: 1000, varying: true });
   MFT = pjs.sendRequest("get", "https://securetransfer.redsis.com/rest/forms/v1/personas/payload");
            MFT = MFT.scanReplace('{"data":{"payloadId":"','');
            pos = MFT.scan('","');
            MFT = String.setLength(MFT, pos-1);
            console.log("PAYLOAD: "+ MFT);
            var body = pjs.sendRequest({
               method: "POST",
               uri: "https://securetransfer.redsis.com/rest/forms/v1/personas/payload/"+MFT+"/submit",
               body: {
               "servicio" : "personas",
               "tipoDocumento": tipoDocumento.toString(),
               "numeroIdentificacion": numeroIdentificacion.toString()
            },
               json: true,
               timeout: 15000,
               time: true
             });
            respuesta = JSON.parse(body.data.message.toString());
            return respuesta;
 }
 //FUNCIÓN INVOCA VALIDACIONES ESTRUCTURA Y COHERENCIA
 function validaciones(numeroIdentificacion, gpoServicio, tablaServicio) {
   var respuesta;
   pjs.define("MFT", { type: 'char', length: 1000, varying: true });
   MFT = pjs.sendRequest("get", "https://securetransfer.redsis.com/rest/forms/v1/validaciones/payload");
            MFT = MFT.scanReplace('{"data":{"payloadId":"','');
            pos = MFT.scan('","');
            MFT = String.setLength(MFT, pos-1);
            console.log("PAYLOAD: "+ MFT);
            var body = pjs.sendRequest({
               method: "POST",
               uri: "https://securetransfer.redsis.com/rest/forms/v1/validaciones/payload/"+MFT+"/submit",
               body: {
               "gpoServicio" : gpoServicio.toString(),
               "tablaServicio": tablaServicio.toString(),
               "identificacion": numeroIdentificacion.toString(),
               "tipoCargueData": 'pjs'
            },
               json: true,
               timeout: 15000,
               time: true
             });
 }
