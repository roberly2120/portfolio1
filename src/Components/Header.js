import { Box, Heading, Flex, Link } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();
   
    useEffect(() => {
        if(clickCount === 5) {
            setClickCount(0);
            navigate('/newproject');
        }
    }, [clickCount, navigate])

    const handleHeadingClick = () => {
        setClickCount(prevCount => prevCount + 1)
    };
    

    return (
        <Box bg="purple.400" w="100%" p={4} color="white">
            <Flex justify="space-between">
                <Heading onClick={handleHeadingClick} style={{ cursor: 'default' }}>
                    Ryan Oberly
                </Heading>
                <Box mt="5px" display="flex">
                    <Link href="/" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                        Home
                    </Link>
                    {/* <Link href="/about" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                        About
                    </Link> */}
                    <Link href="/projects" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                        Projects
                    </Link>
                    <Link href="/testimonials" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                        Testimonials
                    </Link>
                    {/* <Link href="/contact" mr={5}fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                        Contact
                    </Link> */}
                </Box>
            </Flex>
        </Box>
    );
}

export default Header;