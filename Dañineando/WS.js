var ref_val;
var table_val;

function iniciar(){
    ref_val=firebase.database().ref("usuarios");
    //mostrar_val();
    table_val=document.getElementById("here");
    Lista_de_Usuarios();
}
function Lista_de_Usuarios(){
    /*
    var personas = {users:[]};
    personas.users.push(new Array("1","Luis","Diego"));
    personas.users.push(new Array("2","Luis","Diego"));
    personas.users.push(new Array("3","Luis","Diego"));*/
    ref_val.on("value",function(snap){
        var obj = {usuarios:[]};
        var datos=snap.val();
        for (var key in datos) {
            obj['usuarios'].push({nombres: datos[key].nombres, apellidos:datos[key].apellidos, ci: datos[key].ci });
        }
        var myJSON = JSON.stringify(obj);
        table_val.innerHTML = myJSON;
        
        //document.getElementById("demo").innerHTML=obj.employees[1].firstName + " " + obj.employees[1].lastName;
        /*
        var datos=snap.val();
        console.log(JSON.parse(datos));
        var obj = JSON.parse(json);
        var datos=snap.val();
        for (var i = 0; i < datos.length; i++) {
            obj['usuarios'].push({"nombres":datos[i],"apellidos":datos[i],"ci":datos[i]});
        }
        json= JSON.stringify(obj);
        console.log(json);*/
        //return json;
    /*},function(errorObject){
        console.log(errorObject);*/
    });
}