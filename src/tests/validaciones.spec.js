import { validarCorreo } from "../js/validarForm";

describe("Validación de correos", () => {
  it("Debe aceptar correos válidos", () => {
    expect(validarCorreo("user@duoc.cl")).toBeTrue();
    expect(validarCorreo("prof@profesor.duoc.cl")).toBeTrue();
  });

  it("Debe rechazar correos no válidos", () => {
    expect(validarCorreo("user@hotmail.com")).toBeFalse();
  });
});
