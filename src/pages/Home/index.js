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
    Input,
    useToast,
    Spacer,
    Wrap,
} from '@chakra-ui/react';

import { useMediaQuery } from 'react-responsive';

import CardItem from '../../components/cardItem';
import MenuLeft from '../../components/menu';
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {

    //mensagens via toast
    const toast = useToast();

    const [listPokemon, setListPokemon] = useState([]);
    const [isLoadding, setIsLoading] = useState(true);
    const [totalPokemon, setTotalPokemon] = useState(0);
    const [page, setPage] = useState(20);

    function initData() {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30")
            .then(res => res.json())
            .then(
                (result) => {
                    setListPokemon(result.results);
                    setTotalPokemon(result.count);
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
    function searchPokemon(str){
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30")
            .then(res => res.json())
            .then(
                (result) => {
                    setListPokemon(result.results);
                    setTotalPokemon(result.count);
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
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const responsiveWidth = () => {
        if (isBigScreen){
            return '64px';
        }else if(isTabletOrMobile){
            return '120px';
        }else{
            return '150px';
        }
    };

    const onChangeSearch = str => {
        //busca por pokemon
        let data = str.target.value;
    };


    function getMore() {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=" + page)
            .then(res => res.json())
            .then(
                (result) => {
                    setListPokemon(result.results);
                    setPage(page + 10);
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
                <Box bg='Gray 200' w='100%' color='Gray 200'>
                    <Flex color='white'>
                        <MenuLeft />
                        <Box flex='1' bg='#EDF2F7' marginLeft={responsiveWidth}>
                            <Flex p='8' alignContent='space-between' flexDirection='column'>
                                <Box p='4'>
                                    <Stack direction={['column', 'row']}>
                                        <Box h='80px' flex='1' justifyContent='center' alignItems='center'>
                                            <Flex p='2'>
                                                <Text fontSize='30px' fontWeight='bold' color='#1A202C'>Pokédex</Text>
                                                <Box w='50px' />
                                                <Box>
                                                    <Flex p='1' justifyContent='center' w='320px' h='40px' borderRadius='6px 6px 6px 6px' bg='#EDF2F7'>
                                                        {/* <FontAwesomeIcon icon={fas('search')} color='#A0AEC0' size='1x' /> */}
                                                        <Box w='15px' />
                                                        <Input placeholder='Buscar Pokemon pelo nome...' onChange={onChangeSearch} color='#A0AEC0' h='40px' />
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                        </Box>
                                        <Spacer />
                                        <Box>
                                            <Text color='#718096' fontFamily='fantasy'>{listPokemon.length} de {totalPokemon}</Text>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Box p='5'>
                                    <InfiniteScroll
                                        dataLength={listPokemon.length}
                                        next={getMore}
                                        hasMore={true}
                                        loader={<h4>Loading...</h4>}
                                    >
                                        <Wrap spacing='40px' justify='center'>
                                            {listPokemon.map((item) =>
                                                <CardItem key={item.url} data={item} />
                                            )}
                                        </Wrap>
                                    </InfiniteScroll>

                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            }
        </ChakraProvider>
    );
}

export default Home;