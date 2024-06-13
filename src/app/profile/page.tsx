import Head from "next/head";

const posts = [
  {
    id: 1,
    title: "First Blog Post",
    description:
      "This is the description for the first blog post. It covers the topic in detail and provides insightful information.",
    date: "June 13, 2024",
    author: "John Doe",
    image: "https://via.placeholder.com/600x400",
  },
  {
    id: 2,
    title: "Second Blog Post",
    description:
      "This is the description for the second blog post. The article explores new trends and provides expert opinions.",
    date: "June 14, 2024",
    author: "Jane Smith",
    image: "https://via.placeholder.com/600x400",
  },
  {
    id: 3,
    title: "Third Blog Post",
    description:
      "This is the description for the third blog post. It includes interviews with industry leaders and analysis of current events.",
    date: "June 15, 2024",
    author: "Michael Brown",
    image: "https://via.placeholder.com/600x400",
  },
];

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Head>
        <title>Blog News</title>
        <meta
          name="description"
          content="A static blog news page using Next.js and Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Blog News</h1>
          <nav>
            <a href="#" className="text-gray-300 hover:text-white mx-4">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white mx-4">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white mx-4">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-6 rounded-lg shadow-md mb-8"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-white">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-2">
                {post.date} by {post.author}
              </p>
              <p className="text-gray-300">{post.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 p-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          &copy; 2024 Blog News. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
