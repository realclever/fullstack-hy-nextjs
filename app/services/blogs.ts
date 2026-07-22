const blogs = [
  {
    id: 1,
    title: 'Relational databases for cats',
    author: 'Cat Author',
    url: 'https://example.com/cat-blog',
    likes: 7,
  },
  {
    id: 2,
    title: 'A History of Excellent Cats',
    author: 'Professor Cat II',
    url: 'https://example.com/cats',
    likes: 9,
  },
  {
    id: 3,
    title: 'Cats Before the Internet',
    author: 'Professor Cat II',
    url: 'https://example.com/cats-1990',
    likes: 4,
  },
  {
    id: 4,
    title: 'Cats of Tomorrow',
    author: 'Professor Cat II',
    url: 'https://example.com/future-cats',
    likes: 67,
  },
];

let nextId = 5;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({
    id: nextId++,
    title,
    author,
    url,
    likes: 0,
  });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};
