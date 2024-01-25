
import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
} from "@chakra-ui/react";

const MovieForm = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    const [localFormData, setLocalFormData] = useState({
        movieName: "",
        releaseYear: "",
        imageUrl: "",
    });

    const [formErrors, setFormErrors] = useState({
        movieName: false,
        releaseYear: false,
        imageUrl: false,
    });

    useEffect(() => {
        if (formData) {
            setLocalFormData(formData);
        } else {
            setLocalFormData({
                movieName: "",
                releaseYear: "",
                imageUrl: "",
            });
        }
    }, [formData]);
    const handleChange = (e) => {
        setLocalFormData({
            ...localFormData,
            [e.target.name]: e.target.value,
        });
        // Clear error when user starts typing
        setFormErrors({
            ...formErrors,
            [e.target.name]: false,
        });
    };
    const handleSubmit = () => {
        // Check for empty fields
        const errors = {};
        Object.keys(localFormData).forEach((key) => {
            // Exclude properties like __v from validation
            if (!localFormData[key] && key !== "__v") {
                errors[key] = true;
            }
        });
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            console.log('Form has errors:', errors);
        } else {
            console.log('Form Data:', localFormData);
            // Submit the form and reset localFormData
            onSubmit(localFormData);
            onClose();
            setLocalFormData({
                movieName: "",
                releaseYear: "",
                imageUrl: "",
            });
            // Clear any previous errors
            setFormErrors({
                movieName: false,
                releaseYear: false,
                imageUrl: false,
            });
        }
    };



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{formData ? "Edit Movie" : "Add Movie"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired isInvalid={formErrors.movieName}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name="movieName"
                            value={localFormData.movieName}
                            onChange={handleChange}
                        />
                        {formErrors.movieName && (
                            <Text color="red.500" fontSize="sm">
                                Title is required
                            </Text>
                        )}
                    </FormControl>
                    <FormControl mt={4} isRequired isInvalid={formErrors.releaseYear}>
                        <FormLabel>Year</FormLabel>
                        <Input
                            type="text"
                            name="releaseYear"
                            value={localFormData.releaseYear}
                            onChange={handleChange}
                        />
                        {formErrors.releaseYear && (
                            <Text color="red.500" fontSize="sm">
                                Year is required
                            </Text>
                        )}
                    </FormControl>
                    <FormControl mt={4} isRequired isInvalid={formErrors.imageUrl}>
                        <FormLabel>Image URL</FormLabel>
                        <Input
                            type="text"
                            name="imageUrl"
                            value={localFormData.imageUrl}
                            onChange={handleChange}
                        />
                        {formErrors.imageUrl && (
                            <Text color="red.500" fontSize="sm">
                                Image URL is required
                            </Text>
                        )}
                    </FormControl>
                    <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
                        {formData ? "Edit Movie" : "Add Movie"}
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MovieForm;
