import React, { useState, useEffect } from 'react';
import {
    WrapItem,
    Stack,
    Box,
    Text,
    Flex,
    Image,
    useToast,
} from '@chakra-ui/react';
import {
    Link
} from "react-router-dom";
import { colorBackGround } from '../functions';


import Pokeball from '../assets/Pokeball.png';

import { useMediaQuery } from 'react-responsive';
import { verifyCaptur, capitalizeFirstLowercaseRest } from '../functions';


function CardItem({ data }) {

    //mensagens via toast
    const toast = useToast();

    //iniciando estados de variáveis
    const [dataPokemon, setDataPokemon] = useState([]);
    const [isData, setIsData] = useState(false);

    //função inicial do state
    useEffect(() => {
        initData();
    }, []);

    //busca os dados do pokemon
    function initData() {
        fetch(data.url)
            .then(res => res.json())
            .then(
                (result) => {
                    setDataPokemon(result);
                    setIsData(true);
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

    //Responsividade
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const responsiveWidthOffset = (a, b) => {
        if (isBigScreen) {
            return a;
        } else if (isTabletOrMobile) {
            return b;
        } else {
            return b;
        }
    };

    return (
        <WrapItem>
            {isData &&
                <Link
                    to={{
                        pathname: "/pokemon/" + dataPokemon.id,
                    }}
                >
                    <Box w={responsiveWidthOffset('352px', '450px')} h='200px' borderRadius='16px' flex='1' backgroundColor={colorBackGround(dataPokemon.types)} backgroundImage={Pokeball} backgroundRepeat='no-repeat' backgroundPosition='right'>
                        <Flex alignContent='space-between' h='155px' flexDirection='row' justifyContent='space-between'>
                            <Box w={responsiveWidthOffset('140px', '230px')} marginLeft='24px' marginTop='24px'>
                                <Flex alignContent='space-between' h='155px' flexDirection='column' justifyContent='space-between'>
                                    <Box>
                                        <Text color='whiteAlpha.700' lineHeight='24px' fontSize='16px'>#{dataPokemon.id}</Text>
                                        <Text fontSize='24px' lineHeight='32px'>{capitalizeFirstLowercaseRest(dataPokemon.name)}</Text>
                                    </Box>
                                    <Box bg='#EDF2F7' w={responsiveWidthOffset('130px', '120px')} h='40px' padding='8px 16px' borderRadius='6px' gap='8px'>
                                        {
                                            verifyCaptur(dataPokemon.id) ?
                                                <Text color='#2D3748' fontSize='16px' lineHeight='24px' fontWeight='600'>Soltar</Text>
                                                :
                                                <Text color='#2D3748' fontSize='16px' lineHeight='24px' fontWeight='600'>Capturar</Text>
                                        }

                                    </Box>
                                </Flex>
                            </Box>
                            <Box position='relative' width='20vw' flex='1'>
                                <Image src={dataPokemon.sprites.other.home.front_default} marginRight='10' alt='Imagem Pokemón' w={responsiveWidthOffset('100vh', '180px')} objectFit='cover' />
                            </Box>
                        </Flex>
                    </Box>
                </Link>
            }
        </WrapItem>
    );
}

export default CardItem;