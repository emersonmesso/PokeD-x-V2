import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Image,
    Text,
    ChakraProvider,
    Center,
    CircularProgress,
    theme,
    Button,
    useToast,
} from '@chakra-ui/react';
import {
    useParams,
    useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';
import { capitalizeFirstLowercaseRest } from '../functions';


function EvolutionPokemon({ data }) {

    //mensagens via toast
    const toast = useToast();

    //Router DOM
    const params = useParams();
    const id = params.id;

    const [isLoadding, setIsLoading] = useState(true);
    const [idPokemon, setIdPokemon] = useState(0);
    const [imagePokemon, setImagePokemon] = useState('');

    let navigate = useNavigate();

    function getSpecie(url) {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIdPokemon(result.id);
                    console.log('#ID: ' + result.id);
                    getImage(result.id);
                },
                (error) => {
                    toast({
                        title: 'Connection.',
                        description: "Verifique sua conexao com a Internet.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            )
    }
    function getImage(id) {
        fetch('https://pokeapi.co/api/v2/pokemon/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setImagePokemon(result.sprites.other.home.front_default);
                    setIsLoading(false);

                },
                (error) => {
                    //error
                    toast({
                        title: 'Connection.',
                        description: "Verifique sua conexao com a Internet.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            )
    }

    function onclickEvolution(){
        if(idPokemon != id){
            navigate("/pokemon/" + idPokemon, { replace: false });
            window.location.reload();
        }
        
    };

    useEffect(() => {
        getSpecie(data.url);
    }, []);

    return (
        <ChakraProvider theme={theme}>
            { /*Loaing page*/}
            {isLoadding ?
                <Box bg='Gray 200' w='100%' height='100vh' p={4} color='Gray 200'>
                    <Center bg='Gray 200' h='90vh' color='white'>
                        <CircularProgress isIndeterminate color='green' />
                    </Center>
                </Box>
                :
                <Button variant='link' onClick={onclickEvolution}>
                    <Box height='100px' display='flex' justifyContent='center' alignItems='center'>
                        <Flex p='1' alignContent='space-between' flexDirection='row' bottom='0' display='flex' justifyContent='center' alignItems='center'>
                            <Box width='100px' height='100px'>
                                <Flex p='1' alignContent='space-between' flexDirection='column' bottom='0' display='flex' justifyContent='center' alignItems='center'>
                                    <Image src={imagePokemon} alt='Imagem Pokemón' width='100%' />
                                    <Box height='4' />
                                    <Text fontSize='16px' fontWeight='700' color='#FFFFFF'>{capitalizeFirstLowercaseRest(data.name)}</Text>
                                </Flex>
                            </Box>
                            {
                                data.next ?
                                    <Box>
                                        <FontAwesomeIcon icon={fas('angle-right')} color='#FFFFFF' size='1x' />
                                    </Box>
                                    : <Box></Box>
                            }
                        </Flex>
                    </Box>
                </Button>
            }
        </ChakraProvider>

    );
}

export default EvolutionPokemon;