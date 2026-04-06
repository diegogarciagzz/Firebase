'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.config';

interface Item {
  id: string;
  inputText: string;
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'items'));
    setItems(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        inputText: doc.data().inputText,
      }))
    );
  };

  const handleAdd = async () => {
    if (!inputText.trim()) return;
    await addDoc(collection(db, 'items'), { inputText });
    setInputText('');
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteDoc(doc(db, 'items', id));
    fetchItems();
  };

  const handleEdit = async (id: string) => {
    const editValue = prompt('Enter the new value');
    if (!editValue) return;
    await updateDoc(doc(db, 'items', id), { inputText: editValue });
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            📝 NextJS + Firebase
          </h1>
          <p className="text-gray-600">Gestiona tus elementos con Firebase</p>
        </div>

        {/* Add Item Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Escribe algo aquí..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button
              onClick={handleAdd}
              disabled={!inputText.trim()}
              className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              ➕ Agregar
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay elementos aún</h3>
              <p className="text-gray-500">Agrega tu primer elemento arriba</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-linear-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{item.inputText}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="px-4 py-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-linear-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="text-center mt-8 text-gray-500">
            <p>Total de elementos: <span className="font-semibold text-blue-600">{items.length}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}
