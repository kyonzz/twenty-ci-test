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
import { useAuth } from "../../hooks/auth";
import { usePost } from "../../hooks/post";
import Post from "../Post/post";
import PostForm from "../PostForm";

interface IProps {}

const PostCreateModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [, { addPost }] = usePost();

  const onSubmit = ({ title, content }: any) => {
    addPost(title, content);
    onClose();
  };

  const formRef = React.useRef(null);

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PostForm ref={formRef} onSubmit={onSubmit} />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              // @ts-ignore
              formRef.current.submit();
            }}
          >
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
  const {signout} = useAuth();

  return (
    <>
      <HStack p="4" alignItems="flex-start" spacing="6">
        <Button onClick={onOpen} colorScheme="teal" variant="outline">
          New post
        </Button>
        {posts.length ? (
          <List spacing={3}>
            {posts
              .sort((a, b) => b.created_at - a.created_at)
              .map((post) => (
                <ListItem key={post.id}>
                  <Post {...post} />
                </ListItem>
              ))}
          </List>
        ) : (
          <Text>There is no post yet</Text>
        )}

        <Button onClick={() => signout()}  variant="outline">
          Logout
        </Button>
      </HStack>

      <PostCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PostPage;
