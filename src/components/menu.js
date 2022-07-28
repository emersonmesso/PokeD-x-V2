import React from 'react';
import {
    Box,
    Flex,
    Image,
} from '@chakra-ui/react';
import {
    Link
} from "react-router-dom";

import { useMediaQuery } from 'react-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

import Line from '../assets/Line.png';
import PokebolaColors from '../assets/Colours.png';
import Avatar from '../assets/avatar.png';


function MenuLeft() {

    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const responsiveWidth = () => {
        if (isBigScreen) {
            return '64px';
        } else if (isTabletOrMobile) {
            return '70px';
        } else {
            return '120px';
        }
    };

    return (
        <Box w={responsiveWidth} height='100vh' bg='#FFFFFF' style={{ position: 'fixed' }}>
            <Flex alignContent='space-between' w={responsiveWidth} height='100vh' align='center' justify='center' flexDirection='column' justifyContent='space-between'>
                <Box p='4'>
                    <Image src={PokebolaColors} alt='Dan Abramov' />
                </Box>
                <Box p='4' w={responsiveWidth} align='center' justify='center'>
                    <Flex alignContent='center' height='100px' flexDirection='column' justifyContent='space-between'>
                        <Link
                            to={{
                                pathname: "/",
                            }}>
                            <Box>
                                <FontAwesomeIcon icon={fas('house')} color='black' size='2x' />
                            </Box>
                        </Link>

                        <Link
                            to={{
                                pathname: "/capturados",
                            }}>
                            <Box>
                                <Image src={Line} alt='Dan Abramov' />
                            </Box>
                        </Link>
                    </Flex>
                </Box>
                <Box p='4'>
                    <Image src={Avatar} alt='Avatar Icon' />
                </Box>
            </Flex>
        </Box>
    );
}

export default MenuLeft;