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

const Blogs = () => {
  return (
    <div>
      <h2>Blogs</h2>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <div>
              <strong>{blog.title}</strong>
            </div>
            <div>{blog.author}</div>
            <div>{blog.url}</div>
            <div>Likes: {blog.likes}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
