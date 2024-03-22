import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  Image,
  Heading,
  Text,
  Tag,
  StatGroup,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";

export const EventCard = ({ event }) => {
  const { categories } = useContext(CategoryContext);

  return (
    <Card
      cursor="pointer"
      _hover={{ transform: "scale(1.05)" }}
      w={[300, 400]}
      h={500}
      flexWrap="wrap"
      backgroundColor="white"
      variant="elevated"
    >
      <CardHeader p="0">
        {event.image !== "" &&
        event.image.startsWith("https://") &&
        (event.image.endsWith(".jpg") || event.image.endsWith(".jpeg")) ? (
          <Image
            src={event.image}
            w={[300, 400]}
            h={200}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            objectFit="cover"
          />
        ) : (
          <Image
            src="https://cdn.socio.events/spai/q_glossy+w_670+to_avif+ret_img/socio.events/wp-content/uploads/2022/10/AdobeStock_240758729-2048x1146.jpeg"
            w={[300, 400]}
            h={200}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            objectFit="cover"
          />
        )}
      </CardHeader>
      <CardBody>
        <Flex flexDir="column" gap={2} justify="center" align="center">
          <Heading fontSize={["md", "xl"]} textAlign="center" mb={2}>
            {event.title}
          </Heading>
          <Flex
            flexWrap="wrap"
            flexDir="row"
            justify="center"
            align="center"
            gap={2}
          >
            {event.categoryIds.map((id) => (
              <Tag
                key={id}
                colorScheme="blue"
                variant="solid"
                fontSize={["xs", "sm"]}
              >
                {categories.find((category) => category.id === id)?.name ||
                  `Unknown Category with id ${id}`}
              </Tag>
            ))}
          </Flex>
          <Text noOfLines={4}>{event.description}</Text>
          <StatGroup flexDir={["column"]} align="center">
            <Stat p={3}>
              <StatLabel>Starts:</StatLabel>
              <StatNumber fontSize="lg">
                {event.startTime.substring(0, 10)}{" "}
                {event.startTime.substring(11, 16)}
              </StatNumber>
            </Stat>
            <Stat p={3}>
              <StatLabel>Ends:</StatLabel>
              <StatNumber fontSize="lg">
                {event.endTime.substring(0, 10)}{" "}
                {event.endTime.substring(11, 16)}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Flex>
      </CardBody>
    </Card>
  );
};
