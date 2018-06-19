<template>
    <div  id="app" class="container">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="jumbotron" style="text-align: center">SISTEMA DE CITAS MEDICAS</h1>
          <table class="table table-stripped">
            <thead>
              <tr>
                <th style="width:40px;"></th>
                <th style="width:300px ;">NUMERO IDENTIDAD</th>
                <th>PACIENTE</th>
                <th style="width:150px;">FECHA</th>
                <th style="width:200px;">DOCTOR</th>
                <th style="width:100px;">¿Cancelado?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input type="text" v-mask="'####-####-#####'" class="form-control" v-model="newCita.n_identidad"  />
                </td>
                <td>
                  <input type="text" class="form-control" v-model="newCita.nombre_paciente" />
                </td>
                <td>
                  <input type="text" v-mask="'##-##-####'"  class="form-control" v-model="newCita.fecha" placeholder="dd-mm-yyyy" />
                </td>
                <td type="text-align=center">DR. HUESO</td>
                <td>
                  <button @click="add()" type="button" class="btn btn-success btn-block">Agregar</button>
                </td>
              </tr>
              <tr v-if="citasmedicas.length == 0">
                <td colspan="4" class="text-center">No hay registros por mostrar</td>
              </tr>
              <tr v-for="(cita, index) in citasmedicas" :key="index">
                <td>
                  <button 
                    @click="remove(cita)"
                    type="button" class="btn btn-danger btn-xs">
                    <i class="glyphicon glyphicon-trash"></i>
                  </button>
                </td>
                <td>{{ cita.n_identidad }}</td>
                <td>{{ cita.nombre_paciente }}</td>
                <td>{{  cita.fecha}}</td>
                <th>DR. HUESO</th>
                <td class="text-center" :title="cita.paid ? 'Si' : 'No'">
                  <button @click="changeToPaid(cita)" class="btn btn-default btn-sm" :class="{ 'btn-success': cita.paid  }">
                    <i v-if="cita.paid" class="glyphicon glyphicon-ok"></i>
                    <i v-if="!cita.paid" class="glyphicon glyphicon-remove"></i>
                  </button>
                </td>
              </tr>
              
              
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
    
</template>
  
 

<script>
import Firebase from 'firebase';
import toastr from 'toastr';


let config = {
  apiKey: "AIzaSyCDtLH2nqHR49q3a0eh8Y5BlJIOqIag4Es",
  authDomain: "sistemadecitas-6308c.firebaseapp.com",
  databaseURL: "https://sistemadecitas-6308c.firebaseio.com",
  projectId: "sistemadecitas-6308c",
  storageBucket: "sistemadecitas-6308c.appspot.com",
  messagingSenderId: "713895614996"
};


let db_app =  Firebase.initializeApp(config);
let db = db_app.database();

let citasmedicasRef = db.ref('citasmedicas');

export default {
  name: "App",
  firebase:{
    citasmedicas:citasmedicasRef 
  },
  data(){
    return{
      newCita:{
        n_identidad:'',
        nombre_paciente:'',
        fecha:'',
        paid:false
      }
    }
  },
  methods:{
    add:function(){
      if (this.newCita.n_identidad.length > 14) {
        if (this.newCita.nombre_paciente.length > 0) {
          if (this.newCita.fecha.length > 9) {
            citasmedicasRef.push(this.newCita);
            this.newCita.n_identidad='';
            this.newCita.nombre_paciente = '';
            this.newCita.fecha = '';
            toastr.success("Cita Agregada");
          }else{
            toastr.error("Ingrese una fecha valida");
          }
        }else{
          toastr.error("Porfavor ingrese un nombre al paciente");
        }
      }else {
          toastr.error("Numero de Identidad no valido");
      }             
    },
    remove: function(cita) {
      citasmedicasRef.child(cita['.key']).remove();
      toastr.success("La ha sido eliminada exitosamente!")
    },
    changeToPaid:function (cita) {

      cita.paid = !(cita.paid);
      citasmedicasRef.child(cita['.key']).update({paid:cita.paid})
      
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
