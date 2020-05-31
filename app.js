function app() {
  var express = require('express');
  var server = express();
  pjs.defineDisplay("display", "datos.json");
  var estadoRegistro = 'nuevo';
  pjs.import('./*.js');
  vdescarga = true;
  masivo = false; 
  //VALIDA SI ES UN CARGUE NUEVO
  var idPrestador = '838000096';
  var idIps = idPrestador;
  var tipoDoc = 'NI';
  var stmEst = "SELECT * FROM GAW.CONTROL_SCI WHERE idPrestador = "+"'"+idPrestador+"'";
  var camposBD = querymft (stmEst);
  var datosPersona = personas(tipoDoc,idPrestador);
  tipodoc = tipoDoc;
  idprestador = idIps;
  //VALIDA SI HAY REGISTROS ANTIGUOS ALMACENADOS
  if(Object.keys(datosPersona).length > 1){
      estadop = true;
      colorfondo = '#F0F0F0';
      estadoEdit = false;
      estadoRegistro = 'antiguo';
      nomregional = datosPersona.campo1;
      nombreips = datosPersona.campo2;
  }
  else{
      estadop = false;
      estadoEdit = true;
      colorfondo = '#FFFFFF';
      tipodoc = tipoDoc;
      idprestador = idIps;
  }
  if(Object.keys(camposBD).length > 1){
      codigo_legal = camposBD.campo12;
      desc_adicional = camposBD.campo14;
      descripcion = camposBD.campo13;
      codhab = camposBD.campo15;
      codsede = camposBD.campo6;
      nomgerente = camposBD.campo9;
      diligencia = camposBD.campo10;
      representante = camposBD.campo11;
      direccion = camposBD.campo8;
  }
  else{
    estadoRegistro = 'nuevo';
  }
  //CARGA SEDES
  var stmSed = "SELECT DISTINCT COD_SEDE, NOM_SEDE FROM GIP_TBL_REF_REPS_SERV WHERE COD_HABILITACION = '" +codhab +"'";
  var camposSedes = querymft (stmSed);
  display.sedes.clear();
    try{
      console.log("NUMERO DE SEDES: "+Object.keys(camposSedes.data).length);
      for (var i = 0; i < Object.keys(camposSedes.data).length;i++){
        display.sedes.addRecords([{campo1: camposSedes.data[i].campo1, campo2: camposSedes.data[i].campo2}]);
    }
    }
    catch{
      display.sedes.addRecords([{campo1: camposSedes.campo1, campo2: camposSedes.campo2}]);
    }

    //CARGA SERVICIOS
    var stmServ = "SELECT DISTINCT GRSE_CODIGO FROM GIP_TBL_REF_REPS_SERV WHERE COD_HABILITACION = '" +codhab +"'";
    var camposServicios = querymft (stmServ);
    dhos = true;
    damb = true;
    dquir = true;
    dce = true;
    durg = true;
    dapo = true;
    dprot = true;
    dimg = true;
    ddom = true;
    try{
      console.log("NUMERO DE SERVICIOS: "+Object.keys(camposServicios.data).length);
      for (var i = 0; i < Object.keys(camposServicios.data).length;i++){
        if(camposServicios.data[i].campo1 == '1')
           dhos = false
        if(camposServicios.data[i].campo1 == '2')
          dquir = false;
        if(camposServicios.data[i].campo1 == '3')
          dce = false;
        if(camposServicios.data[i].campo1 == '5')
          durg = false;
        if(camposServicios.data[i].campo1 == '7')
          dapo = false;
        if(camposServicios.data[i].campo1 == '9')
          dprot = false;
    }
    }
    catch{
      if(camposServicios.campo1 == '1')
      dhos = false
      if(camposServicios.campo1 == '2')
        dquir = false;
      if(camposServicios.campo1 == '3')
        dce = false;
      if(camposServicios.campo1 == '5')
        durg = false;
      if(camposServicios.campo1 == '7')
        dapo = false;
      if(camposServicios.campo1 == '9')
        dprot = false;
    }
  while(true){

    // PRESENTA PANTALLA DE DATOS BASICOS
    display.datos.execute();
    //VER BOTON DESCARGA
    if(masivo == true){
          vdescarga = false; 
          pjs.messageBox({
          title: 'Cargues masivos',
          message: 'El boton de Carga y descarga para procesos masivos ha sido habilitado en la sección GRUPOS DE SERVICIO'
        });
    }
    //OPCIÓN EDITAR

         if(editar){
          estadop = false;
          colorfondo = '#FFFFFF';
          var CE = true;
          var urgencias = true;
          var quirurgico = true;
          var hospitalizacion = true;
          var temprana = true;
          var transporte = true;
          var otros = true;
          var apoyo = true;
          var imagenes = true;
         }
        //VALIDACIÓN DE MUNICIPIOS
        if(validamun == true){
          pjs.define("salidaReg", { type: 'data structure', qualified: true, dim: 50, elements: {
            "nomRegional": { type: "char", length: 125}
          }})
         var dane = codigo_legal.toString();
         var queryReg = "SELECT REGIONAL FROM GIP_TBL_REF_PRESTADOR WHERE NUM_IDENT = "+"'"+idIps+"'";
         var queryMun = "SELECT CODIGO_LEGAL, DESCRIPCION, DESC_ADICIONAL FROM GIP_TBL_PARAM WHERE CODIGO_LEGAL = "+"'"+dane+"'";
         var camposReg = querymft (queryReg);
         if(Object.keys(camposReg).length >= 1){
            nomregional = camposReg.campo1;
         }
         var camposMun = querymft (queryMun);
         if(Object.keys(camposMun).length > 1){
           desc_adicional = camposMun.campo3;
           descripcion = camposMun.campo2;
         }
         }
        //NOVEDADES
          if(novedades){
              }
        //FUNCIONALIDAD CARGA
        if(cargar){
          display.cargamft.execute();
        }
        // FUNCIONALIDAD BOTON DESCARGA
        if(descarga){
          //ESCRIBE ZIP PARA DESCARGA
        const https = require('https');
        const fs = require('fs');
        const opn = require('opn');
        const request = require('request');
        var sedes = display.sedes.getRecords();
        var codSedes = '';
        display.sedes.forEach(
          function(record) {
            if(record.selsede == 'true')
             codSedes = codSedes + record.campo1 + ','; 
          }
        );
        descargaPlantillas(ce,urgencias,quirurgico,hospitalizacion, temprana, transporte, otros, apoyo, imagenes,codSedes);
        request.get('https://securetransfer.redsis.com:443/download/TEST/Plantillas_SCI.zip').auth('dchipatecua', 'God0522*', false).pipe(fs.createWriteStream('/Users/didierchipatecua/Downloads/Plantillas_SCI.zip'));
         }

// APARTADO DE GRUPOS DE SERVICIOS
         //CONSULTA EXTERNA
         if(verce){
          cancelace = false;
          var stmCE = "SELECT * FROM GAW.SCI_CONSULTAEXTERNA WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
          var camposCE = querymft (stmCE); 
          display.consultaexterna.clear();     
          try{
            for (var i = 0; i < Object.keys(camposCE.data).length;i++){
              console.log("VARIOS");
              display.consultaexterna.addRecords([{campo1: camposCE.data[i].campo1, campo2: camposCE.data[i].campo2, 
                campo3: camposCE.data[i].campo3, campo4: camposCE.data[i].campo4,
                campo5: camposCE.data[i].campo5, campo6: camposCE.data[i].campo6,
                campo7: camposCE.data[i].campo7, campo8: camposCE.data[i].campo8,
                campo9: camposCE.data[i].campo9, campo10: camposCE.data[i].campo10,
                campo11: camposCE.data[i].campo11, campo12: camposCE.data[i].campo12,
                campo13: camposCE.data[i].campo13, campo14: camposCE.data[i].campo14,
                campo15: camposCE.data[i].campo15, campo16: camposCE.data[i].campo16
              }]);  
          }
          }
          catch{
            console.log("SINGLE");
            display.consultaexterna.addRecords([{campo1: camposCE.campo1, campo2: camposCE.campo2, 
              campo3: camposCE.campo3, campo4: camposCE.campo4,
              campo5: camposCE.campo5, campo6: camposCE.campo6,
              campo7: camposCE.campo7, campo8: camposCE.campo8,
              campo9: camposCE.campo9, campo10: camposCE.campo10,
              campo11: camposCE.campo11, campo12: camposCE.campo12,
              campo13: camposCE.campo13, campo14: camposCE.campo14,
              campo15: camposCE.campo15, campo16: camposCE.campo16}]);
          }
          //AGREGA REGISTRO DE ENTRADA
          for(var i = 0; i<10;i++){
            display.consultaexterna.addRecords([{campo1: "", campo2: "", 
            campo3: "", campo4: "",
            campo5: "", campo6: "",
            campo7: "", campo8: "",
            campo9: "", campo10: "",
            campo11: "", campo12: "",
            campo13: "", campo14: "",
            campo15: "", campo16: ""}]);   
          }
          display.pconsultaexterna.execute();
            if(guardarce){
              var stmDeleteCE = "DELETE GAW.SCI_CONSULTAEXTERNA WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
              querymft (stmDeleteCE);
              display.consultaexterna.forEach(function(record) {
              if(record.campo1 != ''){
                var stmInsertCE = "INSERT INTO GAW.SCI_CONSULTAEXTERNA (cod_habilitacion_ips,cod_sede, nom_grupo_serv, reporta_serv, cod_serv_reps, nom_serv_reps, num_consultorios, num_profnales, tl_hrs_disp_profnal, tl_dias_disp_profnal_semana, dia_desde, dia_hasta, hr_desde, hr_hasta, promd_atencn_consulta,año_reporte, identificacion) VALUES ("+"'"+record.campo1+"'"+','+"'"+record.campo2+"'"+', '+"'"+record.campo3+"'"+', '+"'"+record.campo4+"'"+', '+"'"+record.campo5+"'"+', '+"'"+record.campo6+"'"+', '+"'"+record.campo7+"'"+', '+"'"+record.campo8+"'"+', '+"'"+record.campo9+"'"+', '+"'"+record.campo10+"'"+', '+"'"+record.campo11+"'"+', '+"'"+record.campo12+"'"+', '+"'"+record.campo13+"'"+', '+"'"+record.campo14+"'"+', '+"'"+record.campo15+"'"+', '+"'"+record.campo16+"'"+',  '+"'"+idPrestador+"'"+' ) ';
                querymft (stmInsertCE);
              }
            });
            pjs.messageBox({
              title: 'Borrador guardado satisfactoriamente',
              message: 'Sus datos han sido guardados correctamente'
            });
            }
            if(duplicarce){
             //PENDIENTE FUNCIONALIDAD
            }
            if(cancelace){
              display.datos.execute();
              verce = false;
            }
            if(confirmarce){
              var gpoServicio = 'Consulta Externa';
              var tablaServicio = 'SCI_CONSULTAEXTERNA';
              var choice = pjs.messageBox({
                message: 'Esta seguro de procesar sus datos SCI?',
                icon: 'question',
                buttons: [
                  {value: 'SI'},
                  {value: 'NO'}]
              });
              if (choice == 'SI'){
                  validaciones(idPrestador, gpoServicio, tablaServicio);
                   pjs.messageBox({
                    title: 'Validaciones capacidad Instalada',
                    message: 'Se ha enviado la validación de su información, en unos minutos recibirá su resulta vía correo electronico'
                });
              }
            }
         }
        //URGENCIAS
        if(verurg){
          var stmURG = "SELECT * FROM GAW.SCI_URGENCIAS WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
          var camposURG = querymft (stmURG); 
          display.tblurgencias.clear();     
          try{
            for (var i = 0; i < Object.keys(camposURG.data).length;i++){
              console.log("VARIOS");
              display.tblurgencias.addRecords([{campo1: camposURG.data[i].campo1, campo2: camposURG.data[i].campo2, 
                campo3: camposURG.data[i].campo3, campo4: camposURG.data[i].campo4,
                campo5: camposURG.data[i].campo5, campo6: camposURG.data[i].campo6,
                campo7: camposURG.data[i].campo7, campo8: camposURG.data[i].campo8,
                campo9: camposURG.data[i].campo9, campo10: camposURG.data[i].campo10,
                campo11: camposURG.data[i].campo11 
              }]);  
          }
          }
          catch{
            console.log("SINGLE");
            display.tblurgencias.addRecords([{campo1: camposURG.campo1, campo2: camposURG.campo2, 
              campo3: camposURG.campo3, campo4: camposURG.campo4,
              campo5: camposURG.campo5, campo6: camposURG.campo6,
              campo7: camposURG.campo7, campo8: camposURG.campo8,
              campo9: camposURG.campo9, campo10: camposURG.campo10,
              campo11: camposURG.campo11}]);
          }
          //AGREGA REGISTRO DE ENTRADA
          for(var i = 0; i<10;i++){
            display.tblurgencias.addRecords([{campo1: "", campo2: "", 
            campo3: "", campo4: "",
            campo5: "", campo6: "",
            campo7: "", campo8: "",
            campo9: "", campo10: "",
            campo11: ""}]);   
          }
          display.urgencias.execute();
            if(guardarurg){
              var stmDeleteURG = "DELETE GAW.SCI_URGENCIAS WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
              querymft (stmDeleteURG);
              display.tblurgencias.forEach(function(record) {
              if(record.campo1 != ''){
                var stmInsertURG = "INSERT INTO GAW.SCI_URGENCIAS (cod_habilitacion_ips, cod_sede, nom_grupo_serv, reporta_serv, cod_serv_reps, nom_serv_reps, num_consultorios_triage,num_salas_observacion, num_salas_procedimientos,num_consl_urg, año_reporte, identificacion) VALUES ("+"'"+record.campo1+"'"+','+"'"+record.campo2+"'"+', '+"'"+record.campo3+"'"+', '+"'"+record.campo4+"'"+', '+"'"+record.campo5+"'"+', '+"'"+record.campo6+"'"+', '+"'"+record.campo7+"'"+', '+"'"+record.campo8+"'"+', '+"'"+record.campo9+"'"+', '+"'"+record.campo10+"'"+', '+"'"+record.campo11+"'"+', '+"'"+idPrestador+"'"+' ) ';
                querymft (stmInsertURG);
              }
            });
            pjs.messageBox({
              title: 'Borrador guardado satisfactoriamente',
              message: 'Sus datos han sido guardados correctamente'
            });
            }
            if(duplicarurg){
             //PENDIENTE FUNCIONALIDAD
            }
            if(cancelaurg){
              display.datos.execute();
              verce = false;
            }
            if(confirmarurg){
              var gpoServicio = 'Urgencias';
              var tablaServicio = 'SCI_URGENCIAS';
              var choice = pjs.messageBox({
                message: 'Esta seguro de procesar sus datos SCI?',
                icon: 'question',
                buttons: [
                  {value: 'SI'},
                  {value: 'NO'}]
              });
              if (choice == 'SI'){
                  validaciones(idPrestador, gpoServicio, tablaServicio);
                   pjs.messageBox({
                    title: 'Validaciones capacidad Instalada',
                    message: 'Se ha enviado la validación de su información, en unos minutos recibirá su resultado vía correo electronico'
                });
              }
            }
         }

        //QUIRURGICO
          if(verquir){
              var stmQUIR = "SELECT * FROM GAW.SCI_QUIRURGICO WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
              var camposQUIR = querymft (stmQUIR); 
              display.tblquirurgico.clear();     
              try{
                for (var i = 0; i < Object.keys(camposQUIR.data).length;i++){
                  console.log("VARIOS");
                  display.tblquirurgico.addRecords([{campo1: camposQUIR.data[i].campo1, campo2: camposQUIR.data[i].campo2, 
                    campo3: camposQUIR.data[i].campo3, campo4: camposQUIR.data[i].campo4,
                    campo5: camposQUIR.data[i].campo5, campo6: camposQUIR.data[i].campo6,
                    campo7: camposQUIR.data[i].campo7, campo8: camposQUIR.data[i].campo8,
                    campo9: camposQUIR.data[i].campo9, campo10: camposQUIR.data[i].campo10,
                    camp11: camposQUIR.data[i].campo11, campo12: camposQUIR.data[i].campo12,
                    camp13: camposQUIR.data[i].campo13, campo14: camposQUIR.data[i].campo14,
                    camp15: camposQUIR.data[i].campo15
                  }]);  
              }
              }
              catch{
                console.log("SINGLE");
                display.tblquirurgico.addRecords([{campo1: camposQUIR.campo1, campo2: camposQUIR.campo2, 
                  campo3: camposQUIR.campo3, campo4: camposQUIR.campo4,
                  campo5: camposQUIR.campo5, campo6: camposQUIR.campo6,
                  campo7: camposQUIR.campo7, campo8: camposQUIR.campo8,
                  campo9: camposQUIR.campo9, campo10: camposQUIR.campo10,
                  campo11: camposQUIR.campo11, campo12: camposQUIR.campo12,
                  campo13: camposQUIR.campo13, campo14: camposQUIR.campo14,
                  campo15: camposQUIR.campo15}]);
              }
              //AGREGA REGISTRO DE ENTRADA
              for(var i = 0; i<10;i++){
                display.tblquirurgico.addRecords([{campo1: "", campo2: "", 
                campo3: "", campo4: "",
                campo5: "", campo6: "",
                campo7: "", campo8: "",
                campo9: "", campo10: "",
                campo11: "", campo12: "",
                campo13: "", campo14: "",
                campo15: ""}]);   
              }
              display.quirurgico.execute();
                if(guardarquir){
                  var stmDeleteQUIR = "DELETE GAW.SCI_QUIRURGICO WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
                  querymft (stmDeleteQUIR);
                  display.tblquirurgico.forEach(function(record) {
                  if(record.campo1 != ''){
                    var stmInsertQUIR = "INSERT INTO GAW.SCI_QUIRURGICO (cod_habilitacion_ips, cod_sede, nom_grupo_serv, reporta_serv, cod_serv_reps, nom_serv_reps, num_salas_disponibles, dia_desde, dia_hasta, hr_desde, hr_hasta, num_profnales, tl_hrs_dia_disp, dias_semana_disp, año_reporte, identificacion) VALUES ("+"'"+record.campo1+"'"+','+"'"+record.campo2+"'"+', '+"'"+record.campo3+"'"+', '+"'"+record.campo4+"'"+', '+"'"+record.campo5+"'"+', '+"'"+record.campo6+"'"+', '+"'"+record.campo7+"'"+', '+"'"+record.campo8+"'"+', '+"'"+record.campo9+"'"+', '+"'"+record.campo10+"'"+', '+"'"+record.campo11+"'"+', '+"'"+record.campo12+"'"+', '+"'"+record.campo13+"'"+', '+"'"+record.campo14+"'"+', '+"'"+record.campo15+"'"+', '+"'"+idPrestador+"'"+' ) ';
                    querymft (stmInsertQUIR);
                
                  }
                });
                pjs.messageBox({
                  title: 'Borrador guardado satisfactoriamente',
                  message: 'Sus datos han sido guardados correctamente'
                });
                }
                if(duplicarquir){
                 //PENDIENTE FUNCIONALIDAD
                }
                if(cancelaquir){
                  display.datos.execute();
                  verce = false;
                }
                if(confirmarquir){
                  var gpoServicio = 'Quirúrgico';
                  var tablaServicio = 'SCI_QUIRURGICO';
                  var choice = pjs.messageBox({
                    message: 'Esta seguro de procesar sus datos SCI?',
                    icon: 'question',
                    buttons: [
                      {value: 'SI'},
                      {value: 'NO'}]
                  });
                  if (choice == 'SI'){
                      validaciones(idPrestador, gpoServicio, tablaServicio);
                       pjs.messageBox({
                        title: 'Validaciones capacidad Instalada',
                        message: 'Se ha enviado la validación de su información, en unos minutos recibirá su resulta vía correo electronico'
                    });
                  }
                }
          }
          //HOSPITALIZACIÓN
          if(verhospi){
          var stmHOS = "SELECT * FROM GAW.SCI_HOSPITALIZACION WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
          var camposHOS = querymft (stmHOS); 
          display.tblhospitalizacion.clear();     
          try{
            for (var i = 0; i < Object.keys(camposHOS.data).length;i++){
              display.tblhospitalizacion.addRecords([{campo1: camposHOS.data[i].campo1, campo2: camposHOS.data[i].campo2, 
                campo3: camposHOS.data[i].campo3, campo4: camposHOS.data[i].campo4,
                campo5: camposHOS.data[i].campo5, campo6: camposHOS.data[i].campo6,
                campo7: camposHOS.data[i].campo7, campo8: camposHOS.data[i].campo8,
                campo9: camposHOS.data[i].campo9
              }]);  
          }
          }
          catch{ 
            display.tblhospitalizacion.addRecords([{campo1: camposHOS.campo1, campo2: camposHOS.campo2, 
              campo3: camposHOS.campo3, campo4: camposHOS.campo4,
              campo5: camposHOS.campo5, campo6: camposHOS.campo6,
              campo7: camposHOS.campo7, campo8: camposHOS.campo8,
              campo9: camposHOS.campo9}]);
          }
          //AGREGA REGISTRO DE ENTRADA
          for(var i = 0; i<10;i++){
            display.tblhospitalizacion.addRecords([{campo1: "", campo2: "", 
            campo3: "", campo4: "",
            campo5: "", campo6: "",
            campo7: "", campo8: "",
            campo9: ""}]);   
          }
          display.hospitalizacion.execute();
            if(guardarhos){
              var stmDeleteHOS = "DELETE GAW.SCI_HOSPITALIZACION WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
              querymft (stmDeleteHOS);
              display.tblhospitalizacion.forEach(function(record) {
              if(record.campo1 != ''){
                var stmInsertHOS = "INSERT INTO GAW.SCI_HOSPITALIZACION (cod_habilitacion_ips, cod_sede, nom_grupo_serv, reporta_serv, cod_serv_reps, nom_serv_reps,tl_camas_habilitadas_ips,promd_día_estancia , año_reporte, identificacion) VALUES ("+"'"+record.campo1+"'"+','+"'"+record.campo2+"'"+', '+"'"+record.campo3+"'"+', '+"'"+record.campo4+"'"+', '+"'"+record.campo5+"'"+', '+"'"+record.campo6+"'"+', '+"'"+record.campo7+"'"+', '+"'"+record.campo8+"'"+', '+"'"+record.campo9+"'"+', '+"'"+idPrestador+"'"+' ) ';
                querymft (stmInsertHOS);
              }
            });
            pjs.messageBox({
              title: 'Borrador guardado satisfactoriamente',
              message: 'Sus datos han sido guardados correctamente'
            });
            }
            if(duplicarhos){
             //PENDIENTE FUNCIONALIDAD
            }
            if(cancelarhos){
              display.datos.execute();
              verce = false;
            }
            if(confirmarhos){
              var gpoServicio = 'Hospitalizacion';
              var tablaServicio = 'SCI_HOSPITALIZACION';
              var choice = pjs.messageBox({
                message: 'Esta seguro de procesar sus datos SCI?',
                icon: 'question',
                buttons: [
                  {value: 'NO'},
                  {value: 'SI'}]
              });
              if (choice == 'SI'){
                  validaciones(idPrestador, gpoServicio, tablaServicio);
                   pjs.messageBox({
                    title: 'Validaciones capacidad Instalada',
                    message: 'Se ha enviado la validación de su información, en unos minutos recibirá su resultado vía correo electronico'
                });
              }
            }
         }
        //TEMPRANA
         if(vertemp){
          var stmTEMP = "SELECT * FROM GAW.SCI_TEMPRANA WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
          var camposTEMP  = querymft (stmTEMP); 
          display.tbltemprana.clear();     
          try{
            for (var i = 0; i < Object.keys(camposTEMP.data).length;i++){
              display.tbltemprana.addRecords([{campo1: camposTEMP.data[i].campo1, campo2: camposTEMP.data[i].campo2, 
                campo3: camposTEMP.data[i].campo3, campo4: camposTEMP.data[i].campo4,
                campo5: camposTEMP.data[i].campo5, campo6: camposTEMP.data[i].campo6,
                campo7: camposTEMP.data[i].campo7, campo8: camposTEMP.data[i].campo8,
                campo9: camposTEMP.data[i].campo9, campo10: camposTEMP.data[i].campo10
              }]);  
          }
          }
          catch{
            display.tbltemprana.addRecords([{campo1: camposTEMP.campo1, campo2: camposTEMP.campo2, 
              campo3: camposTEMP.campo3, campo4: camposTEMP.campo4,
              campo5: camposTEMP.campo5, campo6: camposTEMP.campo6,
              campo7: camposTEMP.campo7, campo8: camposTEMP.campo8,
              campo9: camposTEMP.campo9, campo10: camposTEMP.campo10
              }]);
          }
          //AGREGA REGISTRO DE ENTRADA
          for(var i = 0; i<10;i++){
            display.tbltemprana.addRecords([{campo1: "", campo2: "", 
            campo3: "", campo4: "",
            campo5: "", campo6: "",
            campo7: "", campo8: "",
            campo9: "", campo10: "",
            }]);   
          }
          display.temprana.execute();
            if(guardartemp){
              var stmDeleteTEMP = "DELETE GAW.SCI_TEMPRANA WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
              querymft (stmDeleteTEMP);
              display.tbltemprana.forEach(function(record) {
              if(record.campo1 != ''){
                var stmInsertTEMP = "INSERT INTO GAW.SCI_TEMPRANA (cod_habilitacion_ips, cod_sede, nom_grupo_serv, reporta_serv, cod_serv_reps, nom_serv_reps, num_profnales,tiemp_promd_activd,tl_dias_disponibles_semana, año_reporte, identificacion) VALUES ("+"'"+record.campo1+"'"+','+"'"+record.campo2+"'"+', '+"'"+record.campo3+"'"+', '+"'"+record.campo4+"'"+', '+"'"+record.campo5+"'"+', '+"'"+record.campo6+"'"+', '+"'"+record.campo7+"'"+', '+"'"+record.campo8+"'"+', '+"'"+record.campo9+"'"+', '+"'"+record.campo10+"'"+', '+"'"+idPrestador+"'"+' ) ';
                querymft (stmInsertTEMP);
              }
            });
            pjs.messageBox({
              title: 'Borrador guardado satisfactoriamente',
              message: 'Sus datos han sido guardados correctamente'
            });
            }
            if(duplicartemp){
             //PENDIENTE FUNCIONALIDAD
            }
            if(cancelartemp){
              display.datos.execute();
              verce = false;
            }
            if(confirmartemp){
              var gpoServicio = 'ProteTempram';
              var tablaServicio = 'SCI_TEMPRANA';
              var choice = pjs.messageBox({
                message: 'Esta seguro de procesar sus datos SCI?',
                icon: 'question',
                buttons: [
                  {value: 'NO'},
                  {value: 'SI'}]
              });
              if (choice == 'SI'){
                  validaciones(idPrestador, gpoServicio, tablaServicio);
                   pjs.messageBox({
                    title: 'Validaciones capacidad Instalada',
                    message: 'Se ha enviado la validación de su información, en unos minutos recibirá su resultado vía correo electronico'
                });
              }
            }
          
         }
         //VER IMAGENES
           if(verima){
            display.imagenes.execute();
         }
        //VER APOYO
           if(verapoyo){
            display.apoyo.execute();
         }
         //AMBULANCIA DOMICILIARIO
            if(veramb){
              var stmAMB = "SELECT * FROM GAW.SCI_TRANSPORTE WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
              var camposAMB = querymft (stmAMB); 
              display.tblambulancia.clear();     
              try{
                for (var i = 0; i < Object.keys(camposAMB.data).length;i++){
                  display.tblambulancia.addRecords([{campo1: camposAMB.data[i].campo1, campo2: camposAMB.data[i].campo2, 
                    campo3: camposAMB.data[i].campo3, campo4: camposAMB.data[i].campo4,
                    campo5: camposAMB.data[i].campo5, campo6: camposAMB.data[i].campo6,
                    campo7: camposAMB.data[i].campo7, campo8: camposAMB.data[i].campo8,
                    campo9: camposAMB.data[i].campo9, campo10: camposAMB.data[i].campo10,
                    camp11: camposAMB.data[i].campo11, campo12: camposAMB.data[i].campo12,
                    camp13: camposAMB.data[i].campo13, campo14: camposAMB.data[i].campo14,
                    camp15: camposAMB.data[i].campo15, camp16: camposAMB.data[i].campo16
                  }]);  
              }
              }
              catch{
                display.tblambulancia.addRecords([{campo1: camposAMB.campo1, campo2: camposAMB.campo2, 
                  campo3: camposAMB.campo3, campo4: camposAMB.campo4,
                  campo5: camposAMB.campo5, campo6: camposAMB.campo6,
                  campo7: camposAMB.campo7, campo8: camposAMB.campo8,
                  campo9: camposAMB.campo9, campo10: camposAMB.campo10,
                  campo11: camposAMB.campo11, campo12: camposAMB.campo12,
                  campo13: camposAMB.campo13, campo14: camposAMB.campo14,
                  campo15: camposAMB.campo15, campo16: camposAMB.campo16}]);
              }
              //AGREGA REGISTRO DE ENTRADA
              for(var i = 0; i<10;i++){
                display.tblquirurgico.addRecords([{campo1: "", campo2: "", 
                campo3: "", campo4: "",
                campo5: "", campo6: "",
                campo7: "", campo8: "",
                campo9: "", campo10: "",
                campo11: "", campo12: "",
                campo13: "", campo14: "",
                campo15: "", campo16: ""}]);   
              }
              display.ambulancia.execute();
                if(guardaramb){
                  var stmDeleteAMB = "DELETE GAW.SCI_TRANSPORTE WHERE IDENTIFICACION = "+"'"+idPrestador+"'";
                  querymft (stmDeleteAMB);
                  display.tblambulancia.forEach(function(record) {
                  if(record.campo1 != ''){
                    var stmInsertQUIR = "INSERT INTO GAW.SCI_AMBULANCIA (cod_habilitacion_ips, cod_sede, nom_grupo_serv, reporta_serv, cod_serv_reps, nom_serv_reps, num_ambulancias_disp, dia_desde, dia_hasta, hr_desde, hr_hasta, num_profnales, tl_hrs_dia_disp, dias_semana_disp, año_reporte, identificacion) VALUES ("+"'"+record.campo1+"'"+','+"'"+record.campo2+"'"+', '+"'"+record.campo3+"'"+', '+"'"+record.campo4+"'"+', '+"'"+record.campo5+"'"+', '+"'"+record.campo6+"'"+', '+"'"+record.campo7+"'"+', '+"'"+record.campo8+"'"+', '+"'"+record.campo9+"'"+', '+"'"+record.campo10+"'"+', '+"'"+record.campo11+"'"+', '+"'"+record.campo12+"'"+', '+"'"+record.campo13+"'"+', '+"'"+record.campo14+"'"+', '+"'"+record.campo15+"'"+', '+"'"+idPrestador+"'"+' ) ';
                    querymft (stmInsertAMB);
                
                  }
                });
                pjs.messageBox({
                  title: 'Borrador guardado satisfactoriamente',
                  message: 'Sus datos han sido guardados correctamente'
                });
                }
                if(duplicaramb){
                 //PENDIENTE FUNCIONALIDAD
                }
                if(cancelaramb){
                  display.datos.execute();
                  verce = false;
                }
                if(confirmaramb){
                  var gpoServicio = 'Transporte';
                  var tablaServicio = 'SCI_TRANSPORTE';
                  var choice = pjs.messageBox({
                    message: 'Esta seguro de procesar sus datos SCI?',
                    icon: 'question',
                    buttons: [
                      {value: 'NO'},
                      {value: 'SI'}]
                  });
                  if (choice == 'SI'){
                      validaciones(idPrestador, gpoServicio, tablaServicio);
                       pjs.messageBox({
                        title: 'Validaciones capacidad Instalada',
                        message: 'Se ha enviado la validación de su información, en unos minutos recibirá su resultaDO vía correo electronico'
                    });
                  }
                }
           }
          //VER OTROS
          if(verdomi){
            display.domiciliario.execute();
          }      
         //FUNCIONALIDAD BOTON GUARDAR
         if(guardar){
           if(codigo_legal.toString() != String.setLength(codhab.toString(), 5)){
              pjs.messageBox({
              title: 'Codigo DANE no coherente',
              message: 'El codigo DANE no coincide con el codigo de habilitación'
              
          });
           }
           else{
            var accion = 'INSERT ';
            if (estadoRegistro == 'antiguo'){
              var stmEst = "UPDATE GAW.CONTROL_SCI SET ESTADO ="+"'01', IDPRESTADOR = "+"'"+idPrestador+"', NOMREGIONAL="+"'"+nomregional+"', TIPODOC="+ "'"+tipodoc+"', NRODOC="+"'"+idPrestador+"',  CODSEDE= "+"'"+codsede+"', NOMBREIPS= "+"'"+nombreips+"', DIRECCION="+"'"+direccion+"', NOMGERENTE= "+"'"+nomgerente+"', DILIGENCIA= "+"'"+diligencia+"', REPRESENTANTE= " +"'"+representante+"', COD_DANE= "+"'"+codigo_legal+"', MUNICIPIO= "+"'"+descripcion+"', DEPARTAMENTO= "+"'"+desc_adicional+"',CODHAB=" +"'"+codhab+"' WHERE IDPRESTADOR = '"+idPrestador+"'";
            }
            else{
              var stmEst = "INSERT INTO GAW.CONTROL_SCI (ESTADO,IDPRESTADOR, NOMREGIONAL, TIPODOC, NRODOC, CODSEDE, NOMBREIPS, DIRECCION, NOMGERENTE, DILIGENCIA, REPRESENTANTE, COD_DANE, MUNICIPIO, DEPARTAMENTO, CODHAB ) VALUES ("+"'01', "+"'"+idPrestador+"'"+','+"'"+nomregional+"'"+', '+"'"+tipodoc+"'"+', '+"'"+idPrestador+"'"+', '+"'"+codsede+"'"+', '+"'"+nombreips+"'"+', '+"'"+direccion+"'"+', '+"'"+nomgerente+"'"+', '+"'"+diligencia+"'"+', '+"'"+representante+"'"+', '+"'"+codigo_legal+"'"+', '+"'"+descripcion+"'"+', '+"'"+desc_adicional+"'"+', '+"'"+codhab+"'"+' ) '; 
            }
            var respuestaInsert = querymft (stmEst); 
            if(respuestaInsert.data == 'Operación fallida, por favor vuelva a intentarlo'){
              pjs.messageBox({
                title: 'Operación fallida',
                message: 'Operación fallida, por favor vuelva a intentarlo'
                
            });
            }
            else{
              pjs.messageBox({
                title: 'Datos almacenados satisfactoriamente',
                message: 'Sus datos se han almacenado correctamente'
            });
            //pjs.clear("Datos", { all: true});
            display.datos.execute();
            }
           }
         }
    }
}
exports.default = app;