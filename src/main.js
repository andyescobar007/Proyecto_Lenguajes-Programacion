

let config = {
  apiKey: "AIzaSyCDtLH2nqHR49q3a0eh8Y5BlJIOqIag4Es",
  authDomain: "sistemadecitas-6308c.firebaseapp.com",
  databaseURL: "https://sistemadecitas-6308c.firebaseio.com",
  projectId: "sistemadecitas-6308c",
  storageBucket: "sistemadecitas-6308c.appspot.com",
  messagingSenderId: "713895614996"
};

let app = firebase.initializeApp(config);
let db = app.database();

let citasmedicasRef = db.ref('citasmedicas');

var vm = new Vue({
  el: "#app",
  ready() {
    citasmedicasRef.on('value',function (snapshot){ 
        console.log('hola');
    });
  },

  data: {
    // Parametros

    newEntry: {
      n_identidad: "",
      paciente: "",
      fecha: ""
    },
    items: [ ],
  },

  methods: {
    remove: function(index) {
      this.items.splice(index, 1);
    },
    // Ecmascript 6 syntax
    add: function() {
      if (this.newEntry.n_identidad.length > 14) {
        if (this.newEntry.paciente.length > 0) {
          if (this.newEntry.fecha.length > 9) {
            citasmedicasRef.push({
              n_identidad: this.newEntry.n_identidad,
              paciente: this.newEntry.paciente,
              fecha: this.newEntry.fecha,
              paid: false
            });
            // this.items.push({
            //   n_identidad: this.newEntry.n_identidad,
            //   paciente: this.newEntry.paciente,
            //   fecha: this.newEntry.fecha,
            //   paid: false
            // });
            this.newEntry.n_identidad = "";
            this.newEntry.paciente = "";
            this.newEntry.fecha = "";
            this.$toastr.success("Cita Agregada");
          } else {
            this.$toastr.error("Ingrese una fecha valida");
          }
        } else {
          this.$toastr.error("Porfavor ingrese un nombre al paciente");
        }
      } else {
        this.$toastr.error("Numero de Identidad no valido");
      }
    },
    changeToPaid: function(item) {
      item.paid = !item.paid;
    },
    totalAmount(t) {
      var total = this.items.reduce(function(a, b) {
        switch (t) {
          case 0:
            return a + (!b.paid ? b.amount : 0);
          case 1:
            return a + (b.paid ? b.amount : 0);
          case 2:
            return a + b.amount;
        }
      }, 0);
      return total.toFixed(2);
    }
  }
});
