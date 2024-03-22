import { Input } from "@chakra-ui/react";

export const EventSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <Input
      placeholder="Type to search for events..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      w="xl"
    />
  );
};
