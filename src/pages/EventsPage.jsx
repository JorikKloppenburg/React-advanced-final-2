/*eslint-disable*/

import React, { useEffect, useState, useContext } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { EventSearch } from "../components/EventSearch";
import { CategoryContext } from "../components/CategoryContext";
import { EventForm } from "../components/EventForm";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const { categories } = useContext(CategoryContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const toast = useToast();

  const initialFormData = {
    title: "",
    image: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: 1,
  };

  useEffect(() => {
    if (events) {
      let filteredEvents = events;

      if (selectedCategoryFilter !== "") {
        filteredEvents = events.filter((event) =>
          event.categoryIds.some(
            (categoryId) =>
              categories.find((category) => category.id === categoryId)
                ?.name === selectedCategoryFilter
          )
        );
      }

      if (searchTerm !== "") {
        filteredEvents = filteredEvents.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredEvents(filteredEvents);
    }
  }, [searchTerm, selectedCategoryFilter, events]);

  const handleCategoryFilterChange = (category) => {
    setSelectedCategoryFilter(category);
  };

  const handleCheckedItemsUpdate = (checkedItems) => {
    setCheckedItems(checkedItems);
    console.log(checkedItems);
  };

  const handleAddEventSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const highestEventId = Math.max(...events.map((event) => event.id));
      const newEventId = highestEventId + 1;
      formData.id = newEventId;
      formData.categoryIds = checkedItems;
      console.log(formData);

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Event created!",
          description: "The event has been created!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFilteredEvents((prevEvents) => [...prevEvents, formData]);

        onClose();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex flexDir="column" align="center" justify="center" m={"5vh"}>
      <Flex flexDir={["column", "row"]} gap={[2, 5]} mb={5}>
        <Flex w={["xs", "md"]}>
          <EventSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          ></EventSearch>
        </Flex>
        <Flex w={["xs", "md"]}>
          <label htmlFor="category">Choose a category:</label>
          <Select
            id="category"
            value={selectedCategoryFilter}
            onChange={(e) => handleCategoryFilterChange(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex justify="center">
          <Button onClick={onOpen} colorScheme="orange">
            Add a new event
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            ,
            <ModalOverlay />
            <ModalContent p={7}>
              <ModalHeader>Add an event</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EventForm
                  initialValues={initialFormData}
                  onSubmit={handleAddEventSubmit}
                  isLoading={isLoading}
                  onClose={onClose}
                  updateCheckedItems={handleCheckedItemsUpdate}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
      <Flex
        gap={[6, 12]}
        flexDir={["column", "row"]}
        justifyContent="center"
        alignItems="center"
        flexWrap={"wrap"}
      >
        {filteredEvents.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <EventCard event={event}></EventCard>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
