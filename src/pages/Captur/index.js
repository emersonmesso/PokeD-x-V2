import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    theme,
    Box,
    Center,
    CircularProgress,
    Flex,
    Stack,
    Text,
    Wrap,
    Image,
    useToast,
} from '@chakra-ui/react';
import CardItemCaptur from '../../components/cardItemCaptur';
import MenuLeft from '../../components/menu';
import { useMediaQuery } from 'react-responsive';
import Vector from '../../assets/Vector.png';
import {
    Link
} from "react-router-dom";

function Captur() {

    //mensagens via toast
    const toast = useToast();

    const [listPokemon, setListPokemon] = useState([]);
    const [isLoadding, setIsLoading] = useState(true);

    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const responsiveWidth = () => {
        if (isBigScreen) {
            return '64px';
        } else if (isTabletOrMobile) {
            return '120px';
        } else {
            return '150px';
        }
    };

    function initData() {
        //buscando a lista de pokemóns
        let lista;
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
        console.log(lista);
        setListPokemon(lista);
        setIsLoading(false);
    }


    useEffect(() => {
        initData();
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
                <Box w='100%'>
                    <Flex color='white'>
                        <MenuLeft />
                        <Box flex='1' h='100vh' bg='#EDF2F7' marginLeft={responsiveWidth}>
                            <Flex p='8' alignContent='space-between' flexDirection='column'>
                                <Box p='4'>
                                    <Stack direction={['column', 'row']}>
                                        <Box h='80px' flex='1' justifyContent='center' alignItems='center'>
                                            <Flex p='2'>
                                                <Text fontSize='30px' fontWeight='bold' color='#1A202C'>Pokemons capturados</Text>
                                            </Flex>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Box p='4' display='flex' justifyContent='center' alignItems='center'>
                                    {listPokemon.length > 0 ?
                                        <Wrap spacing='40px' justify='center'>
                                            {listPokemon.map((item) =>
                                                <CardItemCaptur key={item.id} data={item} />
                                            )}
                                        </Wrap>
                                        :
                                        <Box display='flex' justifyContent='center' alignItems='center'>
                                            <Flex p='8' alignContent='space-between' flexDirection='column'>
                                                <Box display='flex' justifyContent='center' alignItems='center'>
                                                    <Image src={Vector} />
                                                </Box>
                                                <Box h='20px' />
                                                <Box>
                                                    <Text color='#2D3748' fontSize='18px' fontWeight='700'>Nenhum pokemon encontrado</Text>
                                                </Box>
                                                <Flex p='1' alignContent='space-between' flexDirection='row'>
                                                    <Box>
                                                        <Text color='#2D3748' fontSize='18px' fontWeight='700'>Capture Pokemons,</Text>
                                                    </Box>
                                                    <Box w='10px' />
                                                    <Box>
                                                        <Link
                                                            to={{
                                                                pathname: "/",
                                                            }}>
                                                            <Text color='#3182CE'>clique aqui</Text>
                                                        </Link>
                                                    </Box>
                                                </Flex>

                                            </Flex>

                                        </Box>
                                    }

                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            }

        </ChakraProvider>
    );
}

export default Captur;