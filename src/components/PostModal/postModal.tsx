import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as React from "react";
import { PostType } from "../../@types";
import { usePost } from "../../hooks/post";
import PostForm from "../PostForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  data: PostType;
}

const PostModal: React.FC<IProps> = ({ isOpen, onClose, data }) => {
  const [, { editPost }] = usePost();

  const formRef = React.useRef(null);

  const onSubmit = ({ title, content }: any) => {
    editPost(data.id, { title, content });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PostForm ref={formRef} onSubmit={onSubmit} initData={data} />
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
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
