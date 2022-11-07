var app = new Vue({
    el: "#app",
    data: {

      errorMessage: '',
      detalle: false,
      dialog: false,
      isTrue: true,
      isFalse: false,
      proveedores: [],
      columnas: [ {field: 'idproveedor', label: 'ID',width: '40', sortable: 'true'},
                  {field: 'nomproveedor', label: 'Razon social', searchable: true},
                  {field: 'rfc', label: 'R.F.C.'},
                  {field: 'limite_credito', label: 'Limite de credito', numeric: 'true', width:'80'}
                ],
      nombre_col_a: 'AAA',
      nombre_col_b: 'hola mundo',
      promo : false,
      precio : 56.30,
      promoprecio : 30.99,
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar articulo a la ruta' : 'Modificar articulo'
      },
    },
  
    watch: {
      dialog (val) { 
        val || this.close()
      },
    },
  
    created () {
      this.getProveedores();
    },
  
    methods: {
        getProveedores: function () {
        
            axios.get('/sistema/api/api_proveedores.php')
            .then(function (response) {
  
                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } else {
                    app.proveedores = response.data.datos;
                }

            })
        },
        mostrardetalle: function(vid, vnombre) {
            this.detalle = true
        },
  
  
      getColorStatus (pEstado) {
  
        if (pEstado == 0) { return 'green'; }
        else if (pEstado == 1) { return 'green'; }
        else if (pEstado == 2) { return 'orange'; }
        else if (pEstado == 3) { return 'red'; }
        else if (pEstado == 4) { return 'red'; }
        else { return 'gray'; }
      },
  

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
  
      initialize () {
      },
  
      toFormData: function (obj) {
            var form_data = new FormData();
            for (var key in obj) {
                form_data.append(key, obj[key]);
            }
            return form_data;
        },
  
        clearMessage: function (argument) {
            app.errorMessage   = "";
            app.successMessage = "";
        },
  
    }
  });
  