import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event";

test("Koşulların onaylanmasına göre buton aktifliği", async () => {
  //test bileşenini ekrana bas
  render(<Form />);

  //userEvent Kurulumu
  const user = userEvent.setup();

  //Gerekli elemanları al
  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox");

  //checkbox başlangıçta tiksizdir.
  expect(checkBox).not.toBeChecked();

  //buton başlangıçta inaktiftir.
  expect(orderBtn).toBeDisabled();

  //checkbox tiklenir.
  await user.click(checkBox);

  //buton aktif olur.
  expect(orderBtn).toBeEnabled();

  //checkboxtan tik kaldırılır
  await user.click(checkBox);

  //buton inaktif olur
  expect(orderBtn).toBeDisabled();
});

test("Onayla butonu hover olunca bildirim çıkar", async () => {
  render(<Form />);
  //Kurulumu yap
  const user = userEvent.setup();

  //gerekli elemanlar
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const popup = screen.getByText(/Size gerçekten/i);

  //checkbox'ı tikle
  await user.click(checkbox);

  //mouse'u butonun üzerine getir
  fireEvent.mouseEnter(button);

  //bildirim gözüküyor mu? (visible: opacity > 0 ; visibility:visible; display != none)
  expect(popup).toBeVisible();

  //mouse'u butondan çek<
  fireEvent.mouseLeave(button);

  //popup gözükmez
  expect(popup).not.toBeVisible();
});
