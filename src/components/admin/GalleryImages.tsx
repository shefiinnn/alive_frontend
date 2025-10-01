import { useEffect, useState } from 'react';
import api from '../../utils/api';  

export function GalleryImages() {
  const [images, setImages] = useState<any[]>([]);
  const [newImage, setNewImage] = useState<any>({ description: '', image: null });
  const [editingImage, setEditingImage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    setLoading(true);
    setError(null);
    api.get('gallery/')
      .then((res: any) => {
        setImages(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to fetch images');
        console.error(err);
        setLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewImage({ ...newImage, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImage({ ...newImage, image: e.target.files[0] });
    }
  };

  const handleCreate = () => {
    if (!newImage.image) return;
    setError(null);

    const formData = new FormData();
    formData.append('description', newImage.description);
    formData.append('image', newImage.image);

    api.post('gallery/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setNewImage({ description: '', image: null });
        fetchImages();
      })
      .catch((err: any) => {
        setError('Failed to create image');
        console.error(err);
      });
  };

  const handleUpdate = () => {
    if (!editingImage) return;
    setError(null);

    const formData = new FormData();
    formData.append('description', newImage.description);
    if (newImage.image) {
      formData.append('image', newImage.image);
    }

    api.put(`gallery/${editingImage.id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setNewImage({ description: '', image: null });
        setEditingImage(null);
        fetchImages();
      })
      .catch((err: any) => {
        setError('Failed to update image');
        console.error(err);
      });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    setError(null);
    api.delete(`gallery/${id}/`)
      .then(() => {
        fetchImages();
      })
      .catch((err: any) => {
        setError('Failed to delete image');
        console.error(err);
      });
  };

  const startEditing = (img: any) => {
    setEditingImage(img);
    setNewImage({
      description: img.description || '',
      image: null  
    });
  };

  if (loading) return <p className="text-gray-600">Loading gallery...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gallery Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {images.map((img: any) => (
          <div key={img.id} className="border rounded-lg p-2 hover:shadow-lg">
            <img src={img.image} alt={img.description} className="w-full h-40 object-cover rounded-md" />
            <p className="text-sm text-gray-700 mt-2">{img.description || 'No description'}</p>
            <div className="mt-2">
              <button
                onClick={() => startEditing(img)}
                className="text-blue-600 hover:text-blue-800 font-medium mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(img.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          name="description"
          value={newImage.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full md:w-auto flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full md:w-auto flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {editingImage ? (
          <button
            onClick={handleUpdate}
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleCreate}
            className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
}
