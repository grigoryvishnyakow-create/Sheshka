// components/ProductCard.tsx
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  alt: string;
}

interface ProductCardProps {
  product: Product;
  studentId: number;
  onBalanceUpdate?: (newBalance: number) => void;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  height: 20rem;
  background-color: #f2f4f7;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductTitle = styled.h4`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #191c1e;
  margin-bottom: 0.25rem;
`;

const BuyButton = styled.button<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? "#cccccc" : "#006e1d")};
  font-family: "Inter", sans-serif;
  color: #ffffff;
  padding: 8px 32px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.9)};
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  margin-bottom: 1rem;
`;

const Icon = styled.span.attrs({
  className: "material-symbols-outlined"
})`
  font-size: 20px;
  color: #075fab;
  background-color: transparent;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20;
  line-height: 1;
`;

const PriceValue = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  line-height: 1;
  font-weight: 700;
  color: #004784;
`;



const ProductCard: React.FC<ProductCardProps> = ({ product, studentId, onBalanceUpdate }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as "success" | "error" | "warning"
  });

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleBuy = async () => {
    if (isPurchasing) return;
    
    setIsPurchasing(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/student/${studentId}/spend-points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: product.price })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // ОБНОВЛЯЕМ LOCALSTORAGE
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          user.points = data.new_points;
          localStorage.setItem('user', JSON.stringify(user));
        }

      setModal({
          isOpen: true,
          title: "Покупка успешна! 🎉",
          message: `${product.title} куплен! Списано ${product.price} шешей`,
          type: "success"
        });
        
      onBalanceUpdate?.(data.new_points);
      } else {
        let message = data.message || "Недостаточно шешей для покупки";
        let title = "Ошибка покупки";
        let type: "success" | "error" | "warning" = "error";
        
        if (data.error === "insufficient_funds") {
          title = "Недостаточно шешей";
          type = "error";
        }
        setModal({
          isOpen: true,
          title,
          message,
          type
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      setModal({
        isOpen: true,
        title: "Ошибка",
        message: "Ошибка соединения с сервером",
        type: "error"
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <>
      <Card>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.title} />
        </ImageContainer>
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <PriceWrapper>
            <PriceValue>{product.price}</PriceValue>
            <Icon>eco</Icon>
          </PriceWrapper>
          <BuyButton onClick={handleBuy} disabled={isPurchasing}>
            {isPurchasing ? "Обработка..." : "Купить"}
          </BuyButton>
        </ProductInfo>
      </Card>
      
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </>
  );
};

export default ProductCard;