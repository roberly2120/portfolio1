import React from 'react';
import { AppContext } from '../State';
import { generateTestimonial } from '../OpenAI/testimonials';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spinner, Box, Text, Heading, Button, Flex, useMediaQuery } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowBackIcon, ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function TestimonialPage() {
    const { globalState, setGlobalState } = React.useContext(AppContext);
    const { testimonials } = globalState;
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    const handleTestimonialGeneration = async () => {
        setGlobalState({ ...globalState, testimonials: [] });
        try {
            await generateTestimonial(globalState, setGlobalState);
        } catch (err) {
            console.error("Error generating testimonial: ", err);
        }
    }

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <ArrowForwardIcon
                className={className}
                style={{
                    ...style,
                    display: "block",
                    color: "black",
                    zIndex: "2",
                    position: "absolute",
                    top: "70",
                    right: "-50px",
                    width: '2rem',
                    height: '2rem',
                    transform: 'translateY(-50%)'
                }}
                onClick={onClick}
            />
        );
    }
    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <ArrowBackIcon
                className={className}
                style={{
                    ...style,
                    display: "block",
                    color: "black",
                    zIndex: "2",
                    position: "absolute",
                    top: "70",
                    left: "-50px",
                    width: '2rem',
                    height: '2rem',
                    transform: 'translateY(-50%)'
                }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    }
    if (testimonials.length === 0) {
        return (
            <Flex justifyContent="center" alignItems="center" >
                <Spinner style={{ position: "absolute", top: "45%" }} />
            </Flex>
        )
    }
    // on smaller screen sizes, no arrows are shown, add text to indicate that the user can swipe
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "50px" }}>
                <Heading as="h1" mb={8} mt={8}>
                    Completely Real, Not AI-Generated Testimonials
                </Heading>
                {!isLargerThan768 && (
                    <Flex justifyContent="center" alignItems="center" my={4}>
                        <ChevronLeftIcon boxSize={6} />
                        <Text mx={2}>Swipe for more</Text>
                        <ChevronRightIcon boxSize={6} />
                    </Flex>
                )}
                <Slider
                    {...settings}
                    style={{ width: isLargerThan768 ? "40%" : "90%", overflow: "visible", display: 'flex', alignItems: 'stretch' }}
                    nextArrow={isLargerThan768 ? <NextArrow /> : ""}
                    prevArrow={isLargerThan768 ? <PrevArrow /> : ""}
                >
                    {testimonials.map((testimonial, idx) => (

                        <Box
                            key={idx}
                            border="2px solid gray"
                            // w="300px" 
                            h="auto"
                            borderRadius="10px"
                            boxShadow="lg"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            p={4}
                        >
                            <Text textAlign="center">{testimonial}</Text>
                        </Box>

                    ))}
                </Slider>
                <Text mt={12} mb={4}>Not Convinced?</Text>
                <ArrowDownIcon w={8} h={8} />
                <Button mt={4} onClick={handleTestimonialGeneration}>Generate New Testimonials</Button>
            </div>

        </>
    );

}