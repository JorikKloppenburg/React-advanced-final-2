import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex
      flexDir={["column", "row"]}
      alignItems={"center"}
      justifyContent={"center"}
      m={15}
    >
      <Button colorScheme="blue" variant="ghost" fontSize={"3xl"} p={10}>
        <Link to="/">HOME</Link>
      </Button>
    </Flex>
  );
};
