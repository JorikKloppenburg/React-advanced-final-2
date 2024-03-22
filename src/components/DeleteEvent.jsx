/* eslint-disable*/
import { useRef } from "react";
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
} from "@chakra-ui/react";



export const DeleteEvent = ({ onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();


    const handleDeleteClick = () => {
        onOpen();
    };

    const handleDeleteConfirm = () => {
        onDelete();
        onClose();
    };

    return (
        <>
            <Button colorScheme="blue" variant="outline" onClick={handleDeleteClick}>Delete Event</Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Event
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this event? This action cannot be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} colorScheme="blue" >
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteConfirm} ml={3} colorScheme="blue" variant="outline" >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>


    )




}