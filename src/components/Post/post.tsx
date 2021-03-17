import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { PostType } from "../../@types";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { HamburgerIcon } from "@chakra-ui/icons";
import { usePost } from "../../hooks/post";

interface IProps extends PostType {}

const Post: React.FC<IProps> = ({ id, title, author, created_at, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const [, { deletePost }] = usePost();

  return (
    <>
      <Box
        w="xl"
        px="6"
        py="2"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box mb="4">
          <Flex alignItems="center" mb="4">
            <Heading size="xl" isTruncated flex={1}>
              {title}
            </Heading>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                size="xs"
                variant="outline"
              />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem colorScheme="red" onClick={() => setIsOpen(true)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Text noOfLines={4}>{content}</Text>
        </Box>
        <Flex justifyContent="flex-end">
          <Text fontWeight="bold">{`@${author}`}</Text>
          <Text>&nbsp;{`- ${formatDistanceToNow(created_at)}`}</Text>
        </Flex>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deletePost(id);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Post;
