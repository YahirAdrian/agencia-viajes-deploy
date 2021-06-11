import { Testimonial } from '../server/models/Testimoniales.js';
const guardarTestimonial = async (request, response)=>{
    //Validar
    const{nombre, correo, mensaje} = request.body;
    const errores = []
    if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre está vacio'})
    }

    if(correo.trim() === ''){
        errores.push({correo: 'El correo está vacio'})
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje  está vacio'})
    }

    if(errores.length >0){
        const testimoniales = await Testimonial.findAll();
        //Mostrar la vista con errores
        response.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo, 
            mensaje,
            testimoniales
        })
    }else{
        //Almacenarlo en la base de datos
        try{
            await Testimonial.create({
                nombre, correo, mensaje
            });

            response.redirect('/testimoniales');
        }catch(error){
            console.log(error);
        }
    }
}

export {guardarTestimonial};