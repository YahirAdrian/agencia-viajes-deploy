import { Viaje } from '../server/models/Viaje.js';
import { Testimonial } from '../server/models/Testimoniales.js';

const paginaInicio = async(request, response)=>{
    //Consultar 3 viajes del modelo de viajes
    const promiseDb = [];
    promiseDb.push(Viaje.findAll({limit: 3}));
    promiseDb.push(Testimonial.findAll({limit: 3}))
    try {
        const resultado = await Promise.all(promiseDb);
        response.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })

    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (request, response)=>{
    response.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (request, response)=>{
    //consultar BD
    const viajes = await Viaje.findAll();

    response.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (request, response)=>{
    const { slug } = request.params;
    try{
        const resultado = await Viaje.findOne({where:{slug}});
        response.render('viaje',{
            pagina: 'Información viaje',
            resultado
        })
    }catch{
        console.log(error);
    }
}

const paginaTestimoniales = async (request, response)=>{
    
    try{
        const testimoniales = await Testimonial.findAll();
        response.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    
    }catch(error){
        console.log(error);
    }
};

const paginaContacto =  (request, response)=>{
    response.send('Contacto');
};

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaContacto,
    paginaDetalleViaje
}