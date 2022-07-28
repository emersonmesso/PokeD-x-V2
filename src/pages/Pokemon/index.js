import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    Center,
    theme,
    Box,
    CircularProgress,
    Flex,
    Text,
    Spacer,
    Image,
    Button,
    useToast,
    Tabs,
    Tab,
    TabPanel,
    TabList,
    TabPanels,
    Table,
    Tbody,
    Tr,
    Td,
    Tfoot,
    Th,
    Progress,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuLeft from '../../components/menu';
import { useMediaQuery } from 'react-responsive';
import { capitalizeFirstLowercaseRest, colorBackGround, getBackPokemon, verifyCaptur } from '../../functions';
import EvolutionPokemon from '../../components/evolutionPokemon';

function Pokemon() {
    const params = useParams();
    const id = params.id;

    const toast = useToast();
    let navigate = useNavigate();

    const [isLoadding, setIsLoading] = useState(true);
    const [dataPokemon, setDataPokemon] = useState([]);
    const [dataPokemonSpeccies, setDataPokemonSpecies] = useState([]);
    const [dataPokemonEvolution, setDataPokemonEvolution] = useState([]);

    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const responsiveWidth = () => {
        if (isBigScreen) {
            return '64px';
        } else if (isTabletOrMobile) {
            return '70px';
        } else {
            return '150px';
        }
    };

    function initData() {
        fetch("https://pokeapi.co/api/v2/pokemon/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setDataPokemon(result);
                    getDataSpecies(result.id);
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

    function getDataSpecies(id) {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setDataPokemonSpecies(result);
                    getDataEvolutions(result.evolution_chain.url);
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
    function getDataEvolutions(url) {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    evolutionsPokemon(result);
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

    function evolutionsPokemon(result) {
        let evolutions = [];
        recursiveSearch(result.chain, evolutions);
        setDataPokemonEvolution(evolutions);

    };

    function recursiveSearch(chain, list) {
        if (chain.evolves_to.length > 0) {
            //tem evolução
            //salva os dados do chain principal
            var pokemon = {
                'name': chain.species.name,
                'url': chain.species.url,
                'next': true
            };
            list.push(pokemon);
            recursiveSearch(chain.evolves_to[0], list);
        } else {
            //salva os dados do chain principal
            var pokemon = {
                'name': chain.species.name,
                'url': chain.species.url,
                'next': false
            };
            list.push(pokemon);
        }
    }

    function getLocalSotrage() {
        //buscando os dados do localStorage
        let data = window.sessionStorage.getItem("captur");
        if (data != null) {
            //converte a string em JSON
            let response = JSON.parse(data);
            return response;
        } else {
            //Erro
            //não tem salvo ainda
            //salva uma lista vazia
            let listaVazia = [];
            window.sessionStorage.setItem("captur", JSON.stringify(listaVazia));
            return listaVazia;
        }
    }
    function saveLocalStorage(lista) {
        window.sessionStorage.setItem("captur", JSON.stringify(lista));
    }

    function onClickCaptur() {
        //busca a lista salva
        let listaSalva = getLocalSotrage();
        //adicionando o pokemon nessa lista
        let pokemon = {
            'id': dataPokemon.id,
            'name': capitalizeFirstLowercaseRest(dataPokemon.name),
            'logo': dataPokemon.sprites.other.home.front_default
        };
        listaSalva.push(pokemon);
        saveLocalStorage(listaSalva);
        toast({
            title: 'Capturado!.',
            description: "Você capturou " + dataPokemon.name,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setTimeout(function () {
            navigate("../capturados", { replace: true });
        }, 3000);
    }
    function onClickDropPokemon() {
        console.log("Soltar");
        let lista;
        let indexPokemon;
        let data = window.sessionStorage.getItem("captur");
        if (data != null) {
            //converte a string em JSON
            lista = JSON.parse(data);
            lista.map((item, index) => {
                if (item.id == dataPokemon.id) {
                    indexPokemon = index;
                }
            });

            //removendo o item da lista
            lista.splice(indexPokemon, 1);
            saveLocalStorage(lista);
            toast({
                title: 'Livre!.',
                description: "Você soltou " + dataPokemon.name,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setTimeout(function () {
                navigate("/", { replace: true });
            }, 3000);


        } else {
            toast({
                title: 'Erro Ao Soltar.',
                description: "Parece que ele gostou de você!.",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }


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
                isTabletOrMobile ?
                    <Box bg='Gray 200' w='100%' color='Gray 200'>
                        <Flex color='white'>
                            <MenuLeft />
                            <Flex p='8' alignContent='space-between' flexDirection='column' height='100%' bg='#f7fafc'>
                                <Box marginLeft={responsiveWidth}>
                                    <Box >
                                        <Text color='#718096' lineHeight='25px' fontSize='20px'>#{dataPokemon.id}</Text>
                                        <Text fontSize='38px' lineHeight='40px' fontWeight='700' color={colorBackGround(dataPokemon.types)}>{capitalizeFirstLowercaseRest(dataPokemon.name)}</Text>
                                        <Box h='25px' />
                                        <Text color='#718096' fontSize='24px'>{dataPokemonSpeccies.flavor_text_entries[0].flavor_text}</Text>
                                    </Box>
                                    <Box height='20px' />
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        {
                                            verifyCaptur(dataPokemon.id) ?
                                                <Button bg={colorBackGround(dataPokemon.types)} colorScheme='teal' w='80%' padding='15px 15px' variant='ghost' onClick={onClickDropPokemon}>
                                                    <Text fontSize='32px' color='#FFFFFF'>Soltar</Text>
                                                </Button>
                                                :
                                                <Button bg={colorBackGround(dataPokemon.types)} colorScheme='teal' w='80%' padding='15px 15px' variant='ghost' onClick={onClickCaptur}>
                                                    <Text fontSize='32px' color='#FFFFFF'>Capturar</Text>
                                                </Button>
                                        }
                                    </Box>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        <Image src={dataPokemon.sprites.other.home.front_default} alt='Imagem Pokemón' w='400px' />
                                    </Box>
                                    <Box height='20px' />
                                    <Box>
                                        <Box>
                                            <Tabs variant='soft-rounded' colorScheme='teal'>
                                                <TabList>
                                                    <Tab>Sobre</Tab>
                                                    <Tab>Estatísticas</Tab>
                                                </TabList>

                                                <TabPanels>
                                                    <TabPanel>
                                                        <Box bg='white' borderRadius='10px' w='100%' p={1} color='white'>
                                                            <Table variant='unstyled' size='sm'>
                                                                <Tbody>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>HP</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{(dataPokemon.height / 10)} m</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>Peso</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{(dataPokemon.weight / 10)} Kgm</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>Habitat</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{dataPokemonSpeccies.habitat.name}</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>Categoria</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{capitalizeFirstLowercaseRest(dataPokemon.types[0].type.name)}</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                </Tbody>
                                                            </Table>
                                                        </Box>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <Box bg='white' borderRadius='10px' w='100%' p={4} color='white'>
                                                            <Table variant='unstyled' size='sm'>
                                                                <Tbody>
                                                                    {dataPokemon.stats.map((item) => (
                                                                        <Tr>
                                                                            <Td>
                                                                                <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>{capitalizeFirstLowercaseRest(item.stat.name)}</Text>
                                                                            </Td>
                                                                            <Td>
                                                                                <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>{item.base_stat}</Text>
                                                                            </Td>
                                                                            <Td>
                                                                                <Progress value={item.base_stat} />
                                                                            </Td>
                                                                        </Tr>
                                                                    ))}
                                                                </Tbody>
                                                                <Tfoot>
                                                                    <Tr>
                                                                        <Th>Total</Th>
                                                                        <Th>into</Th>
                                                                        <Th>min</Th>
                                                                    </Tr>
                                                                </Tfoot>
                                                            </Table>
                                                        </Box>
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
                                        </Box>
                                    </Box>

                                    <Box height='20px' />

                                    <Box h='40vh' display='flex' justifyContent='center' alignItems='center' bg={colorBackGround(dataPokemon.types)} borderRadius='30px'>
                                        <Flex p='8' alignContent='space-between' flexDirection='column' bottom='0' display='flex' justifyContent='center' alignItems='center'>
                                            <Text fontSize='24px' fontWeight='700' lineHeight='32px'>Evoluções</Text>
                                            <Flex p='8' alignContent='space-between' flexDirection='row' bottom='0'>
                                                {
                                                    dataPokemonEvolution.map((item) =>
                                                        <EvolutionPokemon data={item} />
                                                    )
                                                }
                                            </Flex>
                                        </Flex>
                                    </Box>

                                </Box>

                            </Flex>
                        </Flex>
                    </Box>
                    :
                    <Box bg='Gray 200' w='100%' color='Gray 200'>
                        <Flex color='white'>
                            <MenuLeft />
                            <Box flex='1' height='100vh' bg='#f7fafc' marginLeft={responsiveWidth} backgroundImage={getBackPokemon(dataPokemon.types)} backgroundSize='50vw' backgroundRepeat='no-repeat' backgroundPosition='bottom right'>
                                <Flex p='8' alignContent='space-between' flexDirection='row'>
                                    <Box p='8' width='50vw'>
                                        <Box>
                                            <Text color='#718096' lineHeight='25px' fontSize='20px'>#{dataPokemon.id}</Text>
                                            <Text fontSize='38px' lineHeight='40px' fontWeight='700' color={colorBackGround(dataPokemon.types)}>{capitalizeFirstLowercaseRest(dataPokemon.name)}</Text>
                                            <Box h='25px' />
                                            <Text color='#718096' fontSize='24px'>{dataPokemonSpeccies.flavor_text_entries[0].flavor_text}</Text>
                                            <Box h='35px' />
                                        </Box>

                                        <Box bg='#EDF2F7' w='126px' borderRadius='6px' gap='8px' display='flex' justifyContent='center' alignItems='center'>
                                            {
                                                verifyCaptur(dataPokemon.id) ?
                                                    <Button colorScheme='teal' variant='ghost' onClick={onClickDropPokemon}>
                                                        Soltar
                                                    </Button>
                                                    :
                                                    <Button colorScheme='teal' variant='ghost' onClick={onClickCaptur}>
                                                        Capturar
                                                    </Button>
                                            }

                                        </Box>
                                        <Box height='50px' />
                                        <Box width='35vw'>
                                            <Tabs variant='soft-rounded' colorScheme='teal'>
                                                <TabList>
                                                    <Tab>Sobre</Tab>
                                                    <Tab>Estatísticas</Tab>
                                                </TabList>

                                                <TabPanels>
                                                    <TabPanel>
                                                        <Box bg='white' borderRadius='10px' w='100%' p={1} color='white'>
                                                            <Table variant='unstyled' size='sm'>
                                                                <Tbody>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>HP</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{(dataPokemon.height / 10)} m</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>Peso</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{(dataPokemon.weight / 10)} Kgm</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>Habitat</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{dataPokemonSpeccies.habitat.name}</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                    <Tr>
                                                                        <Td>
                                                                            <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>Categoria</Text>
                                                                        </Td>
                                                                        <Td>
                                                                            <Text color='#718096' fontSize='16px' lineHeight='32px' fontWeight='400'>{capitalizeFirstLowercaseRest(dataPokemon.types[0].type.name)}</Text>
                                                                        </Td>
                                                                    </Tr>
                                                                </Tbody>
                                                            </Table>
                                                        </Box>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <Box bg='white' borderRadius='10px' w='100%' p={4} color='white'>
                                                            <Table variant='unstyled' size='sm'>
                                                                <Tbody>
                                                                    {dataPokemon.stats.map((item) => (
                                                                        <Tr>
                                                                            <Td>
                                                                                <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>{capitalizeFirstLowercaseRest(item.stat.name)}</Text>
                                                                            </Td>
                                                                            <Td>
                                                                                <Text color='#2D3748' fontSize='16px' lineHeight='32px' fontWeight='700'>{item.base_stat}</Text>
                                                                            </Td>
                                                                            <Td>
                                                                                <Progress value={item.base_stat} />
                                                                            </Td>
                                                                        </Tr>
                                                                    ))}
                                                                </Tbody>
                                                                <Tfoot>
                                                                    <Tr>
                                                                        <Th>Total</Th>
                                                                        <Th>into</Th>
                                                                        <Th>min</Th>
                                                                    </Tr>
                                                                </Tfoot>
                                                            </Table>
                                                        </Box>
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
                                        </Box>
                                    </Box>
                                    <Spacer>
                                        <Center>
                                            <Box height='100vh' flex='1' display='flex' justifyContent='center' alignItems='center'>
                                                <Flex p='8' alignContent='space-between' flexDirection='column' position='absolute' bottom='0'>
                                                    <Spacer>
                                                        <Box>
                                                            <Image src={dataPokemon.sprites.other.home.front_default} alt='Imagem Pokemón' w='400px' />
                                                        </Box>
                                                    </Spacer>
                                                    <Box h='40vh' display='flex' justifyContent='center' alignItems='center'>
                                                        <Flex p='8' alignContent='space-between' flexDirection='column' bottom='0' display='flex' justifyContent='center' alignItems='center'>
                                                            <Text fontSize='24px' fontWeight='700' lineHeight='32px'>Evoluções</Text>
                                                            <Flex p='8' alignContent='space-between' flexDirection='row' bottom='0'>
                                                                {
                                                                    dataPokemonEvolution.map((item) =>
                                                                        <EvolutionPokemon data={item} />
                                                                    )
                                                                }
                                                            </Flex>
                                                        </Flex>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </Center>
                                    </Spacer>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
            }
        </ChakraProvider >
    );
}

export default Pokemon;