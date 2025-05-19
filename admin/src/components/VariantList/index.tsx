import React, { useState } from 'react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { Pencil, Trash2 } from 'lucide-react';
const attributeOptions = [
  { name: 'Size', values: ['S', 'M', 'L', 'XL'] },
  { name: 'Color', values: ['Red', 'Blue', 'Black', 'White'] },
  { name: 'Material', values: ['Cotton', 'Polyester', 'Silk'] },
];

const allVariants = [
  {
    id: 1,
    product: 'Product A',
    thumbnail: 'https://i.pravatar.cc/40?img=1',
    price: 100,
    status: 'Available',
    attributes: [
      { attribute: 'Color', value: 'Red' },
      { attribute: 'Size', value: 'M' },
    ],
  },
  {
    id: 2,
    product: 'Product B',
    thumbnail: 'https://i.pravatar.cc/40?img=2',
    price: 120,
    status: 'Discontinued',
    attributes: [
      { attribute: 'Color', value: 'Blue' },
      { attribute: 'Size', value: 'L' },
    ],
  },
  ...Array.from({ length: 27 }, (_, i) => ({
    id: i + 3,
    product: `Product ${String.fromCharCode(67 + i)}`,
    thumbnail: `https://i.pravatar.cc/40?img=${(i % 10) + 3}`,
    price: 130 + i * 10,
    status:
      i % 3 === 0 ? 'Available' : i % 3 === 1 ? 'Outofstock' : 'Discontinued',
    attributes: [
      { attribute: 'Color', value: i % 2 === 0 ? 'Red' : 'Blue' },
      { attribute: 'Size', value: i % 3 === 0 ? 'M' : 'L' },
    ],
  })),
];
type EditData = Variant & {
  images: string[];
  price: string | number;
  compareAtPrice?: string | number;
};
type Attribute = {
  attribute: string;
  value: string;
};

type Variant = {
  id: number;
  product: string;
  thumbnail: string;
  price: number;
  compareAtPrice?: number;
  status: string;
  attributes: Attribute[];
  images?: string[];
};
const VariantList = () => {
  const [variants, setVariants] = useState<Variant[]>(allVariants);
  const [editData, setEditData] = useState<EditData | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(variants.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleDelete = (id: number) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
    setDeleteId(null);
  };
  const handleEditSave = () => {
    if (!editData) return;
    setVariants((prev) =>
      prev.map((v) =>
        v.id === editData.id
          ? {
              ...v,
              ...editData,
              price: Number(editData.price),
              compareAtPrice: Number(editData.compareAtPrice),
              thumbnail:
                editData.images && editData.images.length > 0
                  ? editData.images[0]
                  : '',
            }
          : v
      )
    );
    setEditData(null);
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h1 className="text-2xl font-semibold mb-4">Variant List</h1>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search Variant"
            className="border rounded px-3 py-2 w-64"
          />
          <div className="flex items-center gap-2">
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <button className="border rounded px-3 py-1 text-sm bg-gray-100">
              Export
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm relative">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-2">UID</th>
              <th className="py-2 px-2">PRODUCT</th>
              <th className="py-2 px-2">PRICE</th>
              <th className="py-2 px-2">ATTRIBUTE</th>
              <th className="py-2 px-2 text-center">STATUS</th>
              <th className="py-2 px-2 ">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {variants
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((variant) => (
                <tr key={variant.id} className="border-b">
                  <td className="px-4 py-2">{variant.id}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    {variant.thumbnail && (
                      <img
                        src={variant.thumbnail}
                        alt={variant.product}
                        className="w-10 h-10 object-cover rounded border"
                      />
                    )}
                    <span>{variant.product}</span>
                  </td>
                  <td className="px-4 py-2">${variant.price}</td>
                  <td className="px-4 py-2">
                    {variant.attributes && variant.attributes.length > 0 ? (
                      variant.attributes.map((attr, idx) => (
                        <div key={idx}>
                          <span className="font-medium">{attr.attribute}</span>:{' '}
                          {attr.value}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        variant.status === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : variant.status === 'Outofstock'
                            ? 'bg-yellow-100 text-yellow-700'
                            : variant.status === 'Discontinued'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {variant.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-blue-600 font-semibold cursor-pointer flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setEditData({
                          ...variant,
                          images:
                            Array.isArray(variant.images) &&
                            variant.images.length > 0
                              ? variant.images.filter(Boolean)
                              : variant.thumbnail
                                ? [variant.thumbnail]
                                : [],
                        });
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => setDeleteId(variant.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipPrevious />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateBefore />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateNext />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipNext />
          </button>
        </div>
      </div>
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
            <div className="mb-4 text-center">
              <p>Are you sure you want to delete this variant?</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setDeleteId(null)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={() => handleDelete(deleteId)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-lg bg-white rounded shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Variant</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Product</label>
                  <input
                    className="border rounded px-3 py-2 w-full"
                    value={editData.product || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, product: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Price</label>
                  <input
                    type="number"
                    min={0}
                    className="border rounded px-3 py-2 w-full"
                    value={editData.price || ''}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value >= 0) {
                        setEditData({ ...editData, price: value });
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Compare At Price</label>
                  <input
                    type="number"
                    min={0}
                    className="border rounded px-3 py-2 w-full"
                    value={editData.compareAtPrice || ''}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value >= 0) {
                        setEditData({ ...editData, compareAtPrice: value });
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Status</label>
                  <select
                    className="border rounded px-3 py-2 w-full"
                    value={editData.status || ''}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                  >
                    <option value="Available">Available</option>
                    <option value="Outofstock">Outofstock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className=" block text-sm mb-1">Attributes</label>
                  {(editData.attributes || []).map(
                    (attr: Attribute, idx: number) => (
                      <div key={idx} className="flex gap-2 mb-1">
                        <select
                          className="border rounded px-2 py-1 w-1/2"
                          value={attr.attribute}
                          onChange={(e) => {
                            const updated = [...editData.attributes];
                            updated[idx].attribute = e.target.value;
                            updated[idx].value = '';
                            setEditData({ ...editData, attributes: updated });
                          }}
                        >
                          <option value="">Select attribute</option>
                          {attributeOptions.map((opt) => {
                            const isUsed = editData.attributes.some(
                              (a: Attribute, i: number) =>
                                a.attribute === opt.name && i !== idx
                            );
                            return (
                              <option
                                key={opt.name}
                                value={opt.name}
                                disabled={isUsed}
                              >
                                {opt.name}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          className="border rounded px-2 py-1 w-1/2"
                          value={attr.value}
                          onChange={(e) => {
                            const updated = [...editData.attributes];
                            updated[idx].value = e.target.value;
                            setEditData({ ...editData, attributes: updated });
                          }}
                          disabled={!attr.attribute}
                        >
                          <option value="">Select value</option>
                          {attributeOptions
                            .find((opt) => opt.name === attr.attribute)
                            ?.values.map((val) => (
                              <option key={val} value={val}>
                                {val}
                              </option>
                            ))}
                        </select>
                      </div>
                    )
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Images</label>
                  {editData.images && editData.images.length > 0 && (
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <div className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer">
                        <img
                          src={editData.images[0]}
                          alt="Thumbnail"
                          className="w-32 h-32 object-cover"
                          onClick={() =>
                            document
                              .getElementById(`edit-image-upload-input-0`)
                              ?.click()
                          }
                        />
                        <p className="text-sm text-center mt-2">Thumbnail</p>
                        <button
                          type="button"
                          onClick={() =>
                            setEditData((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    images: prev.images.filter(
                                      (_, i) => i !== 0
                                    ),
                                  }
                                : prev
                            )
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          ✕
                        </button>
                        <input
                          id="edit-image-upload-input-0"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setEditData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        images: prev.images.map((img, i) =>
                                          i === 0
                                            ? (ev.target?.result as string)
                                            : img
                                        ),
                                      }
                                    : prev
                                );
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </div>
                      {editData.images
                        .slice(1)
                        .map((img: string, idx: number) => (
                          <div
                            key={idx + 1}
                            className="relative border border-dashed border-gray-300 rounded p-2 cursor-pointer"
                          >
                            <img
                              src={img}
                              alt={`Image ${idx + 1}`}
                              className="w-16 h-16 object-cover"
                              onClick={() =>
                                document
                                  .getElementById(
                                    `edit-image-upload-input-${idx + 1}`
                                  )
                                  ?.click()
                              }
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setEditData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        images: prev.images.filter(
                                          (_, i) => i !== idx + 1
                                        ),
                                      }
                                    : prev
                                )
                              }
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                              ✕
                            </button>
                            <input
                              id={`edit-image-upload-input-${idx + 1}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    setEditData((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            images: prev.images.map((img, i) =>
                                              i === 0
                                                ? (ev.target?.result as string)
                                                : img
                                            ),
                                          }
                                        : prev
                                    );
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </div>
                        ))}
                      <div
                        className="border border-dashed border-gray-300 rounded p-2 flex items-center justify-center cursor-pointer w-16 h-16"
                        onClick={() =>
                          document
                            .getElementById('edit-image-upload-input-add')
                            ?.click()
                        }
                      >
                        <span className="text-gray-400">Add Image</span>
                        <input
                          id="edit-image-upload-input-add"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              const readers = Array.from(files).map(
                                (file) =>
                                  new Promise<string>((resolve) => {
                                    const reader = new FileReader();
                                    reader.onload = (ev) =>
                                      resolve(ev.target?.result as string);
                                    reader.readAsDataURL(file);
                                  })
                              );
                              Promise.all(readers).then((images) => {
                                setEditData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        images: [
                                          ...(prev.images || []),
                                          ...images,
                                        ],
                                      }
                                    : prev
                                );
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditData(null)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantList;
