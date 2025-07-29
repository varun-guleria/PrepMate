export default function CuratedContent() {
  const resources = [
    { title: "DSA Basics", type: "PDF", link: "#" },
    { title: "System Design Crash Course", type: "Video", link: "#" },
    { title: "Aptitude & Reasoning Guide", type: "PDF", link: "#" },
    { title: "Top 100 Interview Questions", type: "Article", link: "#" },
  ];

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Curated Study Materials</h2>
      <p className="text-gray-600 mb-8">Expert-selected content to help you ace your preparation.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, index) => (
          <div key={index} className="p-6 border rounded-lg shadow hover:shadow-lg">
            <h3 className="font-semibold text-xl mb-2">{res.title}</h3>
            <p className="text-gray-500 mb-4">{res.type}</p>
            <a
              href={res.link}
              className="text-indigo-600 hover:underline font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}