// components/ProductGrid.tsx
import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

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
    title: 'Брендированная сумка',
    price: 2300,
    category: 'Аксессуары',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV86Rn-PmB7ggcLHnGdojBVUWtgI9FZ5UWwNruFDIb9dQUiWLWyopovS-_2X5JU1so1uUB_34wZvU6iSht0dczWL7h6mVQ4e0f3ZkbGxKEvT1IxlgDUWcAgQUkldeFnQgBvNxhnMfh8K7GeJkA0OzQYIGY990N990g6RjOGZ1w6zy3XkiXHM-VqiBQ-9NxP-_RDb1NUSqtt84RVRnuINplR5XNeYSCBNSuQ_Il9XNRuKtcPvti_Wcs40eweGhP4ybuRicKOV7pn622',
    alt: 'A high-quality canvas tote bag in a clean off-white color'
  },
  {
    id: 2,
    title: 'Керамическая кружка',
    price: 1200,
    category: 'Аксессуары',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz6PFVHL8IcZhkYl4lQveWV39046XHMCfk5jOU35Oa89mdd6mMwU9hqEk8OKn6Hfl4xQZYpY12L_xTUfGF9gwBnIGV_LNx3ldzAo-jT7KyNFHY1RodeSrTgSU57YCtXHdXpXAdbqxKrOSihiCOYTgb3EQrTx5AlmbskWbcpe4Uy2qfAxEGwGn9A8oT0xEeespaeRQE8lJn0Q22-vstorZ1izDO130sZwmr-hEr57Qdjjl5jElZUxedeHEsU5teLAB3Y5qE6SH00pyo',
    alt: 'A minimalist matte black ceramic mug'
  },
  {
    id: 3,
    title: 'Набор блокнотов',
    price: 1500,
    category: 'Канцелярские товары',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvhu-BPW9X_6fGVe1M5GlR_1fO28i4TdIWCihhQu7I4KlBHBtMl4SCalkfIkL07W-E9WHK3V0vo624Bgn3AUo8t9A2bvSPiFRNgAaSMoJwSFsBepRJp8Bdh6ilk3OAXiGfeBoUKLt0VcWog7u7pnrdIgngkOPSq4nuAFS_IIXGuaSWoOttrXAz0_-pwH2U6YJCiMDgksqCTppkV6AywazMe61W7y5h1WC9yezW6cqH71aOeIL1gTskg7lQCTr_0X5Yhav-huoTp2bw',
    alt: 'Premium soft-touch notebooks'
  },
  {
    id: 4,
    title: 'Куртка-бомбер',
    price: 4500,
    category: 'Одежда',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpYxV1bXcQjVwvWrMzs-Sy0kOjIDF2ZiLmKBPLWMyk5Ol-yodTjnlhUH94ItRDmjbpCEHXPBX2M6hozPPWSR4o07ubBNJ9T0VG375M01AzZzFsW7Hr6-bfG-XlzK4AJOIq5emPm4MNw1glfqV-YVWJf7c0JTGrDwuIrBXImglZ3kwW8xxePbSqDC2Yv99rVpN_cOnO4XqS-VT_kWA8-caoGKC1quDEpOJ-8T75KNAsROJI-PLhP6f-9O054FH_Dpnwd7VGFyZ0lmoe',
    alt: 'Classic varsity jacket'
  }
];

interface ProductGridProps {
  activeCategory: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ activeCategory }) => {
  const filteredProducts = products.filter(product => {
    if (activeCategory === 'All Items' || activeCategory === 'Всё') {
      return true;
    }
    return product.category === activeCategory;
  });

  return (
    <Grid>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;