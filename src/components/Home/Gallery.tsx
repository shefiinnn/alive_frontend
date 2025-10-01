import { useEffect, useState } from 'react';
import api from '../../utils/api';

type Photo = { image: string; description: string };

export function PhotoGallery() {
  const [showMore, setShowMore] = useState(false);
  const [dynamicPhotos, setDynamicPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const staticPhotos = [
    "/frame/fr1.jpg", "/frame/fr2.jpg", "/frame/fr3.jpg", "/frame/fr4.jpg", "/frame/fr5.jpg",
    "/frame/fr6.jpg", "/frame/fr7.jpg", "/frame/fr8.jpg", "/frame/fr9.jpg", "/frame/fr10.jpg",
    "/frame/fr11.jpg", "/frame/fr12.jpg", "/frame/fr13.jpg", "/frame/f19.jfif", "/frame/f20.jpeg",
    "/frame/fr14.jpg", "/frame/fr15.jpg", "/frame/fr16.jpg", "/frame/fr17.jpg", "/frame/fr18.jpg",
  ];

  useEffect(() => {
    const fetchDynamicPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('gallery/');
        setDynamicPhotos(response.data);
      } catch (err: any) {
        setError('Failed to load dynamic images. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicPhotos();
  }, []);

  const allPhotos: Photo[] = [
    ...staticPhotos.map((url) => ({ image: url, description: "" })),
    ...dynamicPhotos,
  ];


  return (
    <section className="bg-[#FEFBF0] py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-semibold mb-8">Alive in Every Frame</h2>

      {loading && <p className="text-center">Loading gallery...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div
        className={`grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto transition-all duration-500 ease-in-out overflow-hidden ${showMore ? "max-h-none" : "max-h-70"
          }`}
      >
        {allPhotos.map((photo, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg relative">
            <img
              src={photo.image}
              alt={photo.description || `Photo ${idx + 1}`}
              className="w-full object-cover aspect-square transition-transform duration-300 ease-in-out hover:scale-110"
              loading="lazy"
            />
            {photo.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-1 text-center">
                {photo.description}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowMore((v) => !v)}
          className="border border-gray-300 rounded-full px-6 py-2 hover:bg-gray-100 text-gray-800 transition"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </div>
    </section>
  );
}
