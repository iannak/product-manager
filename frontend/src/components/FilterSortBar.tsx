'use client';
import { useState } from 'react';

export const FilterSortBar = ({
  onFilter,
  onSort
}: {
  onFilter: (text: string, min: number, max: number) => void;
  onSort: (order: 'asc' | 'desc') => void;
}) => {
  const [text, setText] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  return (
    <div className="flex gap-4 p-4 bg-gray-100 rounded">
      <input placeholder="Buscar por nome" value={text} onChange={(e) => setText(e.target.value)} className="border p-2" />
      <input placeholder="Min R$" type="number" value={min} onChange={(e) => setMin(e.target.value)} className="border p-2 w-24" />
      <input placeholder="Max R$" type="number" value={max} onChange={(e) => setMax(e.target.value)} className="border p-2 w-24" />
      <button onClick={() => onFilter(text, Number(min), Number(max))} className="bg-blue-500 text-white px-4 py-2 rounded">Filtrar</button>
      <button onClick={() => onSort('asc')} className="bg-green-500 text-white px-4 py-2 rounded">↑ Preço</button>
      <button onClick={() => onSort('desc')} className="bg-red-500 text-white px-4 py-2 rounded">↓ Preço</button>
    </div>
  );
};