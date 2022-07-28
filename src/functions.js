import Bug from './assets/back/bug.png';
import Dark from './assets/back/dark.png';
import Default from './assets/back/default.png';
import Dragon from './assets/back/dragon.png';
import Electric from './assets/back/electric.png';
import Fairy from './assets/back/fairy.png';
import Fighting from './assets/back/fighting.png';
import Fire from './assets/back/fire.png';
import Flying from './assets/back/flying.png';
import Ghost from './assets/back/ghost.png';
import Grass from './assets/back/grass.png';
import Ground from './assets/back/ground.png';
import Ice from './assets/back/ice.png';
import Normal from './assets/back/normal.png';
import Poison from './assets/back/poison.png';
import Psychic from './assets/back/psychic.png';
import Rock from './assets/back/rock.png';
import Steel from './assets/back/steel.png';
import Water from './assets/back/water.png';

//retorna a cor do pokemon de acordo com o seu tipo
export function colorBackGround(types) {
    let color = "#FFF";
    const name = types[0].type.name;
    switch (name) {
        case 'grass':
            color = "#8BBE8A";
            break;
        case 'fire':
            color = "#ffa756";
            break;
        case 'water':
            color = "#58abf6";
            break;
        case 'electric':
            color = "#f2e100";
            break;
        case 'bug':
            color = "#B94100";
            break;
        case 'flying':
            color = "#B8AAA2";
            break;
        case 'normal':
            color = "#168B44";
            break;
        case 'fighting':
            color = "#F79504";
            break;
        case 'poison':
            color = "#8A55A0";
            break;
        case 'ground':
            color = "#4169E1";
            break;
        case 'rock':
            color = "#2F4F4F";
            break;
        case 'psychic':
            color = "#BC8F8F";
            break;
        case 'ice':
            color = "#F5DEB3";
            break;
        case 'ghost':
            color = "#363636";
            break;
        case 'steel':
            color = "#1C1C1C";
            break;
        case 'dragon':
            color = "#800000";
            break;
        case 'dark':
            color = "#000000";
            break;
        case 'fairy':
            color = "#DB7093";
            break;
        default:
            color = "#FFF";

    }
    return color;
}

//transforma texto de caixa baixa em texto com a primeira letra em caixa alta
export function capitalizeFirstLowercaseRest(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

//retorna um numero randomico sobre a descrição do pokemon
export function randomFlavours(min, max) {
    const rand = parseInt(min + Math.random() * (max - min));
    console.log(rand);
    return rand;
}

//verifica se o pokemon já foi capturado
export function verifyCaptur(id) {
    let lista;
    let isCaptur = false;
    //busca os dados no Session Storage
    let data = window.sessionStorage.getItem("captur");
    if (data != null) {
        //converte a string em JSON
        lista = JSON.parse(data);
    } else {
        //não tem salvo ainda
        //salva uma lista vazia
        lista = [];
        window.sessionStorage.setItem("captur", JSON.stringify(lista));
    }
    //percorre a lista de pokemons salvas
    lista.map((item) => {
        if (item.id == id) {
            console.log(item.name + ' - ' + item.id);
            isCaptur = true;
        }
    });
    return isCaptur;
}


//retorna a imagem do fundo de acordo com o tipo do pokemon
export function getBackPokemon(types) {
    const name = types[0].type.name;
    switch (name) {
        case 'grass':
            return Grass;
        case 'fire':
            return Fire;
        case 'water':
            return Water;
        case 'electric':
            return Electric;
        case 'bug':
            return Bug;
        case 'flying':
            return Flying;
        case 'normal':
            return Normal;
        case 'fighting':
            return Fighting;
        case 'poison':
            return Poison;
        case 'ground':
            return Ground;
        case 'rock':
            return Rock;
        case 'psychic':
            return Psychic;
        case 'ice':
            return Ice;
        case 'ghost':
            return Ghost;
        case 'steel':
            return Steel;
        case 'dragon':
            return Dragon;
        case 'dark':
            return Dark;
        case 'fairy':
            return Fairy;
        default:
            return Default;
    }
}