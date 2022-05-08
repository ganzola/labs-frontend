<template>
  <div class="col-12 col-sm-10 col-md-8 offset-sm-1 offset-md-2">
    <div class="mt-5">
      <form class="border border-primary rounded form-inline" @submit="associate">

        <h2 class="col-12 text-center text-primary mt-3 mb-5">Agregar un nuevo curso como profesor</h2>

        <div class="form-group col-12">
          <label for="courseName" class="custom-label col-md-3">Contrase&ntilde;a</label>
          <input id="courseName" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" type="text"
                 placeholder="Contraseña" v-model="courseName" required/>
        </div>

        <div class="form-group col-12">
          <label for="hours" class="custom-label col-md-3">Contrase&ntilde;a</label>
          <input id="hours" class="form-control col-12 col-sm-10 col-md-7 offset-sm-1" type="number"
                 placeholder="Horas" v-model="hours" required/>
        </div>
        
        <div class="col-12 mb-3">
          <button class="col-sm-6 col-md-4 offset-sm-5 offset-md-7 btn btn-primary" type="submit">
            Agregar curso
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {getAuthenticationToken} from '@/dataStorage';

  export default {
    name: "AddCourse",
    data( ){
      return {
        courseName: '',
        hours: '',
        isProfessor: false,
      }
    },
    beforeCreate( ){
      const rolesPath = '/mis-roles';
      axios
        .get( this.$store.state.backURL + rolesPath )
        .then( response => {
          if( response.status !== 200 ){
            alert( "Error en la petición. Intente nuevamente" )
          }else{
            response.data.map( role => {
              if (role == 'Profesor')
                this.isProfessor = true
            })
          }
        }).catch( response => {
          alert( "No es posible conectar con el backend en este momento" );
        });
    },
    methods: {
      associate( event ){
        if (this.isProfessor){
          axios
            .post( this.buildURI( ), {
                courseName: this.courseName,
                durationHours: this.hours
              }, {
                params: {
                  access_token: getAuthenticationToken()
                }
              }
            ).then( response => {
              if( response.status !== 201 ){
                alert( "Error en la petición. Intente nuevamente" );
              }else{
                alert( "Se ha asignado exitosamente el nuevo curso" );
              }
            }).catch( response => {
              if( response.response.status === 401 ){
                alert( "¡Ups! Al parecer tu contraseña es incorrecta o la sesión ha finalizado" );
              }else if ( response.response.status === 400 ){
                alert( "¿Estás seguro de que aún no esta creado el curso?" );
              }else{
                alert( "No es posible conectar con el backend en este momento" );
              }
            });
        } else {
          alert('El usuario no es un profesor')
        }
        event.preventDefault( );
      },
      buildURI( ){
        let associatePath = "/profesor/crear-curso";
        return this.$store.state.backURL + associatePath;
      }
    }

  }
</script>

<style scoped>
  .form-inline .form-group{
    margin-bottom: 1rem;
  }
</style>