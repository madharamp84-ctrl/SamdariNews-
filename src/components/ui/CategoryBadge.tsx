import { Link } from 'react-router-dom';

interface CategoryBadgeProps {
  categoryId: string;
  className?: string;
}

export default function CategoryBadge({ categoryId, className = '' }: CategoryBadgeProps) {
  const getColors = (id: string) => {
    switch(id) {
      case 'politics': return 'bg-red-600 text-white shadow-sm';
      case 'technology': return 'bg-black text-white shadow-sm';
      case 'sports': return 'bg-blue-700 text-white shadow-sm';
      case 'entertainment': return 'bg-purple-700 text-white shadow-sm';
      default: return 'bg-gray-800 text-white shadow-sm';
    }
  };

  const name = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  return (
    <Link 
      to={`/category/${categoryId}`} 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getColors(categoryId)} ${className} hover:opacity-80 transition-opacity whitespace-nowrap`}
    >
      {name}
    </Link>
  );
}
