type Note = {
  id?: number;
  title?: string;
  content?: string;
  user?: User;
  isActive?: boolean;
  tags?: Tag[];
  tagsIds?: number[];
};

type Tag = {
  id?: number;
  name?: string;
  color?: string;
  user?: User;
};
