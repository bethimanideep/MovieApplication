import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Center,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";

import MovieForm from "./MovieForm";
import Navbar from "./Navbar";
import { auth, provider } from "./firebase"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [gData, setgData] = useState("")
    const [data, setData] = useState(true)
    const [loading, setLoading] = useState(true);
    const toast = useToast()
    //Fetching Movies
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://movieapplication-d07u.onrender.com/movies");
                console.log(response.data.data);
                setMovies(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching movies:", error);
                // setLoading(false);
            }
        };

        fetchMovies();
    }, []);
    //Adding New Movie
    const handleAddMovie = async (newMovie) => {
        try {
            const response = await axios.post("https://movieapplication-d07u.onrender.com/movies", newMovie);
            setMovies([...movies, response.data.data]);
            toast({
                title: 'Movie Added.',
                description: "Movie Added Successfully.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    };
    //Editing Movie
    const handleEditMovie = async (editedMovie) => {
        console.log('Edited Movie:', editedMovie);

        try {
            const response = await axios.put(`https://movieapplication-d07u.onrender.com/movies/`, editedMovie);
            console.log('Edit Movie Response:', response.data);

            const updatedMovies = movies.map(movie =>
                movie._id === response.data.data._id ? response.data.data : movie
            );
            setMovies(updatedMovies);

            toast({
                title: 'Movie Edited.',
                description: "Movie Edited Successfully.",
                status: 'info',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error editing movie:", error);
        }
    };
    //Deleting Movie
    const handleDeleteMovie = async (movieId) => {
        try {
            await axios.delete(`https://movieapplication-d07u.onrender.com/movies/${movieId}`);
            const updatedMovies = movies.filter(movie => movie._id !== movieId);
            setMovies(updatedMovies);
            toast({
                title: 'Movie Deleted.',
                description: "Movie Deleted Successfuly.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };
    //Login
    const handleGoogleLogin = async () => {
        if (auth.currentUser) {
            // If user is already logged in, log them out
            await signOut(auth);
            toast({
                title: 'SignOut',
                description: "SignOut Successfull.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            })
        } else {
            // If user is not logged in, show Google login popup
            signInWithPopup(auth, provider).then((data) => {
                console.log(data);
                setgData(data.user.displayName);
                toast({
                    title: 'SignIn',
                    description: "SignIn Successfull.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            });
        }
        setData(false);

    }
    //Check user is already authenticated
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setgData(user.displayName);
                setData(false);
            } else {
                setgData("");
                setData(true);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <Navbar />
            <HStack mt={100} ml={900}>
                <Button variant="solid" colorScheme="green" onClick={() => setIsAddFormOpen(true)}>
                    Add Movie
                </Button>

                <Button variant="solid" colorScheme="green" onClick={handleGoogleLogin}>
                    {auth.currentUser ? "Logout" : "Login"}
                </Button>

                {auth.currentUser && (
                    <Text fontSize="xl" fontWeight="bold" color="blue.500" ml={4}>
                        {gData}
                    </Text>
                )}
            </HStack>


            <MovieForm
                isOpen={isAddFormOpen}
                onClose={() => setIsAddFormOpen(false)}
                onSubmit={handleAddMovie}  // Make sure you pass the correct onSubmit function here
                formData={null}
                setFormData={() => { }}
            />

            <Center>
                {
                    loading ? <div class="spinner"></div>
                    :
                        <Box
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                gap: "10px",
                            }}
                        >
                            {movies.map((movie) => (
                                <Box key={movie._id} mt={10} gap={10} maxW="sm">
                                    <Card>
                                        <Image
                                            src={movie.imageUrl}
                                            alt={movie.movieName}
                                            borderTopRadius="lg"
                                            maxH="200px"
                                            objectFit="cover"
                                        />
                                        <CardBody>
                                            <Stack spacing="3">
                                                <Heading size="md">{movie.movieName}</Heading>
                                                <Text color="blue.600" fontSize="lg">
                                                    YEAR : {movie.releaseYear}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <Center>
                                            <ButtonGroup mb={10} spacing="2">
                                                <Button
                                                    variant="solid"
                                                    colorScheme="orange"
                                                    onClick={() => {
                                                        setIsEditFormOpen(true);
                                                        setEditFormData(movie);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="solid"
                                                    colorScheme="red"
                                                    onClick={() => handleDeleteMovie(movie._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </Center>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                }

            </Center>

            <MovieForm
                isOpen={isEditFormOpen}
                onClose={() => {
                    setIsEditFormOpen(false);
                    setEditFormData(null);
                }}
                onSubmit={handleEditMovie}
                formData={editFormData}
                setFormData={setEditFormData}
            />
        </div>
    );
};

export default MovieList;
