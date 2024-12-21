import prisma from "@/lib/prisma";

export type Tag = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  addedById: number;
  createdAt: Date;
  updatedAt: Date;
};

export const createTag = async (tag: Tag) => {
  const newTag = await prisma.tag.create({
    data: tag,
  });
  return newTag;
};

export const getTags = async () => {
  const tags = await prisma.tag.findMany();
  return tags;
};

export const searchTags = async (query: string) => {
  const tags = await prisma.tag.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { slug: { contains: query } },
        { description: { contains: query } },
      ],
    },
  });
  return tags;
};

export const getTagBySlug = async (slug: string) => {
  const tag = await prisma.tag.findFirst({
    where: { slug },
  });
  return tag;
};

export const getTagByName = async (name: string) => {
  const tag = await prisma.tag.findFirst({
    where: { name },
  });
  return tag;
};


export const getTag = async (id: number) => {
  const tag = await prisma.tag.findUnique({
    where: { id },
  });
  return tag;
};

export const updateTag = async (tag: Tag) => {
  const updatedTag = await prisma.tag.update({
    where: { id: tag.id },
    data: tag,
  });
  return updatedTag;
};

export const deleteTag = async (id: number) => {
  const deletedTag = await prisma.tag.delete({
    where: { id },
  });
  return deletedTag;
};


export const getTagsByProductId = async (productID: number) => {
    console.log("projectId", productID);
  const tags = await prisma.productTag.findMany({
    where: {
      productId: productID,
    },
    include: {
      tag: true,
    },
  });

  return tags;
};
    