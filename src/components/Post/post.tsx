import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { PostType } from "../../@types";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface IProps extends PostType {}

const Post: React.FC<IProps> = ({ id, title, author, created_at, content }) => {
  return (
    <Box
      w="xl"
      px="6"
      py="2"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box mb="4">
        <Heading size="xl" isTruncated mb="4">
          {title}
        </Heading>
        <Text noOfLines={4}>
          {content}
        </Text>
      </Box>
      <Flex justifyContent="flex-end">
        <Text fontWeight="bold">{`@${author}`}</Text>
        <Text>&nbsp;{`- ${formatDistanceToNow(created_at)}`}</Text>
      </Flex>
    </Box>
  );
};

export default Post;
