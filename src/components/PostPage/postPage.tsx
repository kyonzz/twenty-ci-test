import {
  Button,
  Grid,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { usePost } from "../../hooks/post";
import Post from "../Post/post";

interface IProps {}

const PostCreateModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit } = useForm();
  const [, { addPost }] = usePost();

  const onSubmit = ({ title, content }: any) => {
    addPost(title, content);
    onClose();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Title"
              maxLength={40}
              mb={4}
              isRequired
              name="title"
              ref={register}
            />
            <Textarea
              isRequired
              // value={value}
              // onChange={handleInputChange}
              maxLength={200}
              // noOfLines={5}
              resize="none"
              placeholder="Content"
              size="sm"
              name="content"
              ref={register}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Post
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PostPage: React.FC<IProps> = () => {
  const [{ posts }] = usePost();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack p="4" alignItems="flex-start" spacing="6">
        <Button onClick={onOpen} colorScheme="teal" variant="outline">
          New post
        </Button>
        <List spacing={3}>
          {posts
            .sort((a, b) => b.created_at - a.created_at)
            .map((post) => (
              <ListItem key={post.id}>
                <Post {...post} />
              </ListItem>
            ))}
        </List>
      </HStack>

      <PostCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PostPage;
