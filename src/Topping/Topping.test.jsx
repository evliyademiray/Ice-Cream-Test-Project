import { render, screen } from "@testing-library/react";
import Topping from ".";
import userEvent from "@testing-library/user-event";

test("API'dan gelen soslar için ekrana kartlar basılıyor mu?", async () => {
  render(<Topping />);
  const images = await screen.findAllByAltText("sos-resim");

  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Sosları ekleme çıkarma işlemi toplam fiyatı etkiler", async () => {
  render(<Topping />);
  const user = userEvent.setup();

  //Toplam ücret başlığı sıfır mı?
  const total = screen.getByRole("heading", { name: /Soslar Ücreti/i });
  expect(total).toHaveTextContent(0);

  //bütün sosların checkbox'larını çağır
  const toppings = await screen.findAllByRole("checkbox");

  //soslardan 1.incisini sepete ekle
  await user.click(toppings[0]);

  //total 3e eşit mi?
  expect(total).toHaveTextContent(3);

  //soslardan 3.üncüsünü sepete ekle
  await user.click(toppings[2]);

  //total 6ya eşit mi?
  expect(total).toHaveTextContent(6);

  //soslardan 1.incisini kaldır
  await user.click(toppings[0]);

  //total 3e eşit mi?
  expect(total).toHaveTextContent(3);

  //soslardan 3.üncüsünü kaldır
  await user.click(toppings[2]);

  //total 0a eşit mi?
  expect(total).toHaveTextContent(0);
});
