import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import Login from "../pages/Login";

describe("Pruebas de componentes básicos", () => {
  it("Debe renderizar el título en Home", () => {
    render(<Home />);
    expect(screen.getByText(/Bienvenido a Level-Up Gamer/i)).toBeTruthy();
  });

  it("Debe mostrar el formulario de Login", () => {
    render(<Login />);
    expect(screen.getByText(/Inicio de Sesión/i)).toBeTruthy();
  });
});
