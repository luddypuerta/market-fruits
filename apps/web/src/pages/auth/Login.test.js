import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from './Login';
const mockNavigate = vi.fn();
describe('Login Page', () => {
    it('renders the login form', () => {
        render(_jsx(BrowserRouter, { children: _jsx(Login, {}) }));
        expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    });
    it('shows error on invalid credentials', () => {
        render(_jsx(BrowserRouter, { children: _jsx(Login, {}) }));
        fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'wrong' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
        expect(screen.getByText(/Usuario o contraseña incorrectos/i)).toBeInTheDocument();
    });
    it('redirects when credentials are correct', () => {
        vi.mock('react-router-dom', async () => {
            const actual = await vi.importActual('react-router-dom');
            return {
                ...actual,
                useNavigate: () => mockNavigate,
            };
        });
        render(_jsx(BrowserRouter, { children: _jsx(Login, {}) }));
        fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'admin123' } });
        fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
        expect(localStorage.getItem('token')).toBe('mock-token');
        expect(localStorage.getItem('user')).toBe('Administrador');
    });
});
