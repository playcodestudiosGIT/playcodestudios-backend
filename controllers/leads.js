const { response, request } = require('express');


const { Lead } = require('../models');
const { sendOneEmail, createContactBrevo} = require('../helpers/brevo_services');




const obtenerLeads = async (req = request, res = response) => {


    const query = { estado: true };
    try {
        const leads = await Lead.find(query);
        res.json({ leads });

    } catch (error) {
        res.status(400).json({
            msg: 'error obteniendo leads'
        })

    }

}

const crearLead = async (req, res = response) => {
    try {
        const { nombre, email, telf, description, proyect_type, budget } = req.body;
        // Generar la data a guardar
        const data = {
            nombre: nombre,
            email: email,
            telf: telf,
            description: description,
            proyect_type: proyect_type,
            budget: budget
        }
        
        const lead = new Lead(data);
        // Guardar DB
        await lead.save();

        await sendOneEmail(nombre, email, telf).then(function (data) {
          
        });

        return res.status(201).json(lead);

    } catch (error) {
        res.json({
            msg: 'error crear lead'
        })
    }

}


const actualizarLead = async (req, res = response) => {

    const { id } = req.params;
    const { email, telf } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { email: email, telf: telf }, { new: true });

    res.json(lead);
}



const deleteLead = async (req, res = response) => {
    const { id } = req.params;
    const lead = await Lead.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(lead);
}


module.exports = {
    obtenerLeads,
    crearLead,
    actualizarLead,
    deleteLead
}