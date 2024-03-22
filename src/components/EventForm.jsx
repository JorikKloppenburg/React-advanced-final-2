/*eslint-disable*/
import { useState, useContext } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Flex,
  Button,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { CategoryContext } from "./CategoryContext";
import { UserContext } from "./UserContext";

export const EventForm = ({
  initialValues,
  onSubmit,
  isLoading,
  onClose,
  updateCheckedItems,
}) => {
  const { categories } = useContext(CategoryContext);
  const { users } = useContext(UserContext);
  const [formData, setFormData] = useState(initialValues);
  const [user, setUser] = useState(initialValues.createdBy);
  const [checkedItems, setCheckedItems] = useState(
    initialValues.categoryIds || []
  );
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
    console.log(user);
  };

  const handleCategoryCheck = (categoryId, isChecked) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = isChecked
        ? [...prevCheckedItems, categoryId]
        : prevCheckedItems.filter((id) => id !== categoryId);
      updateCheckedItems(updatedCheckedItems);
      return updatedCheckedItems;
    });
  };

  const isCategoryChecked = (categoryId) => checkedItems.includes(categoryId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckedItems(checkedItems);
    onSubmit(formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {isLoading ? (
        <Flex>
          <p>Loading..</p>
          <Spinner />
        </Flex>
      ) : (
        <>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="image" isRequired>
            <FormLabel>Image Url</FormLabel>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="location" isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="startTime" isRequired>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="endTime" isRequired>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="createdBy" isRequired>
            <FormLabel>Created By</FormLabel>
            <Select value={user} onChange={handleUserChange}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="categoryIds" isRequired={checkedItems.length === 0}>
            <FormLabel>Categories</FormLabel>
            <Flex flexdir={["column", "row"]} gap={2}>
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  value={category.id}
                  isChecked={isCategoryChecked(category.id)}
                  onChange={(e) =>
                    handleCategoryCheck(category.id, e.target.checked)
                  }
                >
                  {category.name}
                </Checkbox>
              ))}
            </Flex>
          </FormControl>
          <Flex flexdir={["column", "row"]} gap={4} mt={2}>
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
            <Button onClick={onClose} colorScheme="blue" variant="outline">
              Cancel
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};
