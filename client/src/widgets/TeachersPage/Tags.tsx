import { TagsContainer, Tag } from "./styles";

const Tags = ({ tags }: { tags: string[] }) => (
  <TagsContainer>
    {tags.slice(0, 2).map((tag, i) => (
      <Tag key={i}>{tag}</Tag>
    ))}
    {tags.length > 2 && <Tag>+{tags.length - 2}</Tag>}
  </TagsContainer>
);

export default Tags;
