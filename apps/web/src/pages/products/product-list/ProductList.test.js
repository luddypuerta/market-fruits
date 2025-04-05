import { jsx as _jsx } from "react/jsx-runtime";
import * as productStore from '@/store/products/productStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './ProductList';
const mockProducts = [
    { id: 1, name: 'Apple', category: 'Fruits', stock: 10, price: 2000, tax: 0.19, image: '' },
    { id: 2, name: 'Banana', category: 'Fruits', stock: 8, price: 1500, tax: 0, image: '' },
];
beforeEach(() => {
    vi.spyOn(productStore, 'useProductStore').mockReturnValue({
        products: mockProducts,
        loadProducts: vi.fn(),
        updateStock: vi.fn(),
    });
});
describe('ProductList', () => {
    it('renders products grouped by category', () => {
        render(_jsx(BrowserRouter, { children: _jsx(ProductList, {}) }));
        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
    });
});
