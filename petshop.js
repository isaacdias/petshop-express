const moment = require('moment');
const fs = require('fs');

let bancoDados = fs.readFileSync('./bancoDados.json');

bancoDados = JSON.parse(bancoDados);

const petshop = {
    listarPets: () => {

        bancoDados.pets.forEach((pet) => {
            let {nome, idade, tipo, raca, vacinado, servicos} = pet
    
            console.log(`${nome}, ${idade} anos, ${tipo}, ${raca}`);
        
            servicos.forEach((servico) => {
                console.log(`${servico.data} - ${servico.nome}`);
            })
            vacinado ? console.log('Está vacinado!') : console.log('Não vacinado!');
            console.log('-----------------------------')
    
        })
    },
    vacinarPet: (pet) => {

        if (pet.vacinado === true) {
            console.log(`${pet.nome} já está vacinado`);
        }
        else{
            pet.vacinado = true;
            atualizarBancoDeDados()
            console.log(`${pet.nome} foi vacinado com sucesso.`)
        }
    },
    vacinacaoPets: () => {
        let petsVacinados = 0
    
        bancoDados.pets.map(pet => {
            if (!pet.vacinado) {
                vacinarPet(pet)
                petsVacinados++
            }
            return petsVacinados;
        })
        console.log(`${petsVacinados} pets foram vacinados!`)
    },
    adicionarPet: (...novosPets) => {
        novosPets.forEach((novoPet) => {
            if (!novoPet.servicos) {
                novoPet.servicos = [];
            }
            bancoDados.pets.push(novoPet);
        })
    
        atualizarBancoDeDados();
        novosPets.forEach((pet) => {
            console.log(`${pet.nome} foi adicionado com sucesso!`);
        })
    },
    darBanhoPet: pet => {
        pet.servicos.push({
            'nome':'Banho',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBancoDeDados()
        console.log(`O serviço de banho foi realizado no ${pet.nome}.`);
    },
    tosarPet: (pet) => {
        pet.servicos.push({
            'nome':'Tosa',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBancoDeDados()
        console.log(`O serviço de tosa foi realizado no ${pet.nome}.`);
    },
    apararUnhasPet: (pet) => {
        pet.servicos.push({
            'nome':'Aparar unhas',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBancoDeDados()
        console.log(`O serviço de aparar unhas foi realizado no ${pet.nome}.`);
    },
    atenderCliente: (pet, servico) => {
        console.log(`Olá, seja bem vindo, iremos cuidar do ${pet.nome}`)
        servico(pet);
        console.log('Obrigado, volte sempre.')
    },
    buscarPet: (nomePet) => {

        let petEncontrado = bancoDados.pets.find((pet) => {
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    },
    filtrarPet: (tipoPet) => {
        const tiposDePets = bancoDados.pets.filter(pet => pet.tipo == tipoPet)
        console.log(`${tipoPet}s`)
        console.log('')
        for (let pet of tiposDePets) {
            console.log(`${pet.nome}.`);
        }
    },
    clientePremium: (pet) => {
        let nServicos = pet.servicos.length;
    
        if (nServicos >= 5) {
            console.log(
                `Olá, ${pet.nome}! Você ganhou um serviço grátis.!`
            );
        } else {
            console.log(
                `Olá, ${pet.nome}! Você ainda não tem serviços gratis disponiveis!`
            );
        }
    },
    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
        
        return `Tutor: ${tutor}, Contato: ${contato}, Pet: ${nome}`;
    },
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        
        console.log(`Pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${contatoTutor(pet)}`)
        })
    },
    atualizarBancoDeDados: () => {
        jsonPet = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync("pets.json", jsonPet , (err) => {
            if (err) throw err;
        });
    },
    anosDeIdade: (pet) => {
        if(pet.idade <= 1) {
            return 'ano';
        } else{
            return 'anos';
        }
    }
}


module.exports = petshop;