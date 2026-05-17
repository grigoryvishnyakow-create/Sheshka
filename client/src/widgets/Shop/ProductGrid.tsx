// components/ProductGrid.tsx
import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import Z from "../../assets/Значок_КГУ.jpg";
import O from "../../assets/Блокнот.jpg";
import V from "../../assets/Худи.jpg";
import zz from "../../assets/Футболка_ч.jpg";
import oo from "../../assets/Футболка_б.jpg";
import vv from "../../assets/Футболка_с.jpg";
import ZZ from "../../assets/Кепка.jpg";
import OO from "../../assets/Обложка.jpg";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  alt: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Значок КГУ',
    price: 200,
    category: 'Аксессуары',
    image: Z,
    alt: 'A high-quality canvas tote bag in a clean off-white color'
  },
  {
    id: 2,
    title: 'Блокнот',
    price: 450,
    category: 'Канцелярские товары',
    image: O,
    alt: 'A minimalist matte black ceramic mug'
  },
  {
    id: 3,
    title: 'Кепка>',
    price: 3000,
    category: 'Одежда',
    image: ZZ,
    alt: 'Classic varsity jacket'
  },
  {
    id: 4,
    title: 'Худи',
    price: 4500,
    category: 'Одежда',
    image: V,
    alt: 'Classic varsity jacket'
  },
  {
    id: 5,
    title: 'Футболка Черная',
    price: 2500,
    category: 'Одежда',
    image: zz,
    alt: 'Classic varsity jacket'
  },
  {
    id: 6,
    title: 'Футболка Белая>',
    price: 2500,
    category: 'Одежда',
    image: oo,
    alt: 'Classic varsity jacket'
  },
  {
    id: 7,
    title: 'Футболка Синяя>',
    price: 2500,
    category: 'Одежда',
    image: vv,
    alt: 'Classic varsity jacket'
  },
  {
    id: 8,
    title: 'Обложка на зачетку',
    price: 1500,
    category: 'Аксессуары',
    image: OO,
    alt: 'Premium soft-touch notebooks'
  }
];

interface ProductGridProps {
  activeCategory: string;
  studentId: number;
  onBalanceUpdate?: (newBalance: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  activeCategory, 
  studentId, 
  onBalanceUpdate 
}) => {
  const filteredProducts = products.filter(product => {
    if (activeCategory === 'All Items' || activeCategory === 'Всё') {
      return true;
    }
    return product.category === activeCategory;
  });

  return (
    <Grid>
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          studentId={studentId}
          onBalanceUpdate={onBalanceUpdate}
        />
      ))}
    </Grid>
  );
};

export default ProductGrid;