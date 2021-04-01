const express = require('express');
const petshop = require('./petshop')
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor rodando!')
});

// console.log(petshop.listarPets());

app.get('/pets', (req, res) => {

    res.send(petshop.listarPets())
});

app.post('/addpets', (req, res) => {
    const novoPet = req.body;
    console.log(novoPet)
    petshop.adicionarPet(novoPet)
    return res.json(novoPet)    
});

app.get('/pets/:nome', (req, res) => {
    const {nome} = req.params;

    res.send(petshop.buscarPet(nome))
})




