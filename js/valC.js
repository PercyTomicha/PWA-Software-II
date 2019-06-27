window.onload=iniciar;
var form_val;
var ref_val;
var table_val;
var CREATE="Registrar";
var UPDATE="Actualizar";
var modo=CREATE;
var ref_key_a_editar;

function iniciar(){
    form_val=document.getElementById("formulario");
    form_val.addEventListener("submit",enviar_val,false);

    table_val=document.getElementById("listado");

    ref_val=firebase.database().ref("contactos");
    mostrar_val();
}
function mostrar_val(){
    ref_val.on("value",function(snap){
        var datos=snap.val();
        var fila_a_mostrar="";
        for(var key in datos){
            fila_a_mostrar+="<tr>"+
                                "<td>"+datos[key].nombres+"</td>"+
                                "<td>"+datos[key].email+"</td>"+
                                "<td>"+datos[key].asunto+"</td>"+
                                "<td>"+datos[key].mensaje+"</td>"+
                                '<td>'+
                                    '<button class="btn btn-default editar" data-val="'+key+'">'+
                                        '<span class="glyphicon glyphicon-pencil"></span>'+
                                    '</button>'+
                                '</td>'+
                                '<td>'+
                                    '<button class="btn btn-danger borrar" data-val="'+key+'">'+
                                        '<span class="glyphicon glyphicon-trash"></span>'+
                                    '</button>'+
                                '</td>'+
                            "</tr>";
        }
        table_val.innerHTML=fila_a_mostrar;
        if(fila_a_mostrar!=""){
            var elem_editar=document.getElementsByClassName("editar");
            for(var i=0;i<elem_editar.length;i++){
                elem_editar[i].addEventListener("click",editar_val,false);
            }
            var elem_borrar=document.getElementsByClassName("borrar");
            for(var i=0;i<elem_borrar.length;i++){
                elem_borrar[i].addEventListener("click",borrar_val,false);
            }
        }
    });
}

function editar_val(){
    var key_a_editar=this.getAttribute("data-val");
    ///////////////////////////////
    ref_key_a_editar=ref_val.child(key_a_editar);
    ref_key_a_editar.once("value",function(snap){
        var datos=snap.val();
        document.getElementById("nombres").value=datos.nombres;
        document.getElementById("email").value=datos.email;
        document.getElementById("asunto").value=datos.asunto;
        document.getElementById("mensaje").value=datos.mensaje;
        document.getElementById("ok").style.display='none';
    });
    document.getElementById("botonsito").className="btn btn-info";
    document.getElementById("botonsito").value=UPDATE;
    modo=UPDATE;
}

function borrar_val(){
    var key_a_borrar=this.getAttribute("data-val");
    var ref_key_a_borrar=ref_val.child(key_a_borrar);
    ref_key_a_borrar.remove();
}

function enviar_val(event){
    event.preventDefault();
    switch(modo){
        case CREATE:
            ref_val.push({
                nombres: event.target.nombres.value,
                email: event.target.email.value,
                asunto: event.target.asunto.value,
                mensaje: event.target.mensaje.value,
            });
            break;
        case UPDATE:
            ref_key_a_editar.update({
                nombres: event.target.nombres.value,
                email: event.target.email.value,
                asunto: event.target.asunto.value,
                mensaje: event.target.mensaje.value,
            });
            modo=CREATE;
            document.getElementById("botonsito").value=CREATE;
            document.getElementById("botonsito").className="btn btn-success";
            break;
    }
    form_val.reset();
}