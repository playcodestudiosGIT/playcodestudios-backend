const { Schema, model } = require('mongoose');

const LeadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'el Email es requerido'],
        
    },  
    telf: {
        type: String,
        required: [true, 'el Teléfono es requerido'],
        
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
    proyect_type: {
        type: String,
        default: 'Proyect Type'
    },
    budget: {
        type: String,
        default: ''
    },
    estado: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });


LeadSchema.methods.toJSON = function() {
    const { __v, _id, estado, ...data } = this.toObject();
    data.uid = _id
    return data;
}


module.exports = model( 'Lead', LeadSchema );
