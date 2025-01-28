import { Chip } from "@mui/material";

type TagChipProps = {
  tag: Tag;
  handleClick?: (tags?: number[]) => void;
};

const TagChip = ({ tag, handleClick }: TagChipProps) => {
  return (
    <Chip
      onClick={
        handleClick ? () => handleClick([tag.id ? tag.id : 0]) : () => {}
      }
      style={{
        color: "#EEEEEE",
        backgroundColor: tag.color ? `#${tag.color}` : "#235bb7",
      }}
      label={tag.name}
    />
  );
};

export default TagChip;
