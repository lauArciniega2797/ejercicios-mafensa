var prospectos_app = new Vue({
    el: '#prospectosApp',
    data: {
        error_message: '',
        prospectos: [],
        nombre_f: '',
        nombre_c: '',
        encargado: '',
        ciudad: '',
        phone: '',
        email: '',
        message_sql: '',
        user_to_edit: '',
        isEditing: false,
        isActiveForm: true,
        isActiveTable: false,
        
        show: true,

        columns: [
            {
                field: 'nombre_f',
                label: 'Nombre a facturar',
                searchable: true,
                centered: true,
            },
            {
                field: 'nombre_c',
                label: 'Nombre comercial',
                searchable: true,
                centered: true,
            },
            {
                field: 'encargado',
                label: 'Encargado',
                searchable: true,
                centered: true,
            },
            {
                field: 'ciudad',
                label: 'Ciudad',
                searchable: true,
                centered: true,
            },
            {
                field: 'telefono',
                label: 'Teléfono',
                numeric: true,
                centered: true,
            },
            {
                field: 'email',
                label: 'Email',
                centered: true,
            }
        ]
    },
    created: function() {
        this.getProspectos();
    },
    methods: {
        changeView(param) {
            if(param == 'f') {
                this.isActiveForm = true;
                this.isActiveTable = false;
            }
            else if(param == 't') {
                this.isActiveTable = true;
                this.isActiveForm = false;
            }
        },
        deleteProspecto: function(param) {
            let este = this;

            axios.post('api.php?action=deleteProspecto', {llave: param})
            .then((res) => {
                if(res.data.error){
                    este.error_message = 'No se ha podido eliminar el registro';
                } else if(res.data.message) {
                    este.message_sql = res.data.message;
                }

                este.getProspectos();
            })
        },
        editProspecto: function(param){
            let este = this;

            axios.post('api.php?action=editProspecto', {llave : param})
            .then((res) => {
                if(res.data.error){
                    este.error_message = 'No se ha podido eliminar el registro';
                } 
                else if(res.data.datos) {
                    este.user_to_edit   = res.data.datos[0].id;
                    este.isEditing      = true;
                    este.encargado      = res.data.datos[0].encargado;
                    este.nombre_f       = res.data.datos[0].nombre_f;
                    este.nombre_c       = res.data.datos[0].nombre_c;
                    este.ciudad         = res.data.datos[0].ciudad;
                    este.phone          = res.data.datos[0].telefono;
                    este.email          = res.data.datos[0].email;
                }

                este.getProspectos();
            })
        },
        getProspectos: function() {
            let este = this;

            axios.get('api.php?action=consultar_prospectos')
            .then((res) => {
                if(res.data.error) {
                    este.error_message = 'no se pudieron mostrar los registros';
                }
                else {
                    este.prospectos = res.data.datos;
                }
            });
        },
        insertProspecto: function() {
            let este = this,
                data = {
                    nombre_f    : este.nombre_f,
                    nombre_c    : este.nombre_c,
                    encargado   : este.encargado,
                    ciudad      : este.ciudad,
                    telefono    : este.phone,
                    email       : este.email,
                    code        : este.user_to_edit,
                };

            if(!this.isEditing) {
                axios.post('api.php?action=registrar_prospectos&opc=i', JSON.stringify(data))
                .then((res) => {
                    
                    if(res.data.error) {
                        este.error_message = 'No se ha podido registrar al prospecto';
                        este.message_sql = '';

                    } else if (res.data.message) {
                        este.message_sql = res.data.message
                        este.error_message = '';

                        este.getProspectos();
                    }
                });
                este.limpiarDatos();
            } else {
                axios.post('api.php?action=registrar_prospectos&opc=u', JSON.stringify(data))
                .then((res) => {
                    if (res.data.error) {
                        este.error_message = 'No se han podido actualizar los datos';
                        este.message_sql = '';
                    }
                    else if(res.data.message) {
                        este.message_sql = res.data.message;
                        este.error_message = '';

                        este.getProspectos();
                    }
                })
                este.isEditing = false;
                este.limpiarDatos();
            }
        },
        limpiarDatos: function() {
            this.nombre_f = '';
            this.nombre_c = '';
            this.encargado = '';
            this.ciudad = '',
            this.phone = '';
            this.email = '';
        }
    }
})