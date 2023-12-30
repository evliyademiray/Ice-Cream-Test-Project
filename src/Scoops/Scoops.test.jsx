import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Scoops from ".";

/*
!Seçiciler
?Method [all] BySeçici
* Method > get | find | query 
* get > element başlangıçta DOM'da varsa kullanılır
* query > get ile benzer çalışır, eleman bulamazsa null döndürür
* find > elementin ne zaman ekrana basılacağı belli değilse (async)

* not: find metodu promise döndürür
* - bu yüzden async await kullanılmalı

* eğer All kullanırsak gelen cevap her zaman dizi şeklindedir
*/

//Ürünler ekrana geliyor mu?
test("API'dan gelen veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);

  //Ekrana basılan kartları al
  const images = await screen.findAllByAltText("çeşit-resim");

  //gelen resimlerin sayısı 1'den büyük mü
  expect(images.length).toBeGreaterThanOrEqual(1);
});

//Ekleme ve sıfırlama butonları işlevselliği
test("Çeşit ekleme ve sıfırlamanın toplama etkisi", async () => {
  render(<Scoops />);
  const user = userEvent.setup();
  // 1-Ekle ve sıfırlamanın butonlarını çağırma
  const addButtons = await screen.findAllByRole("button", { name: "Ekle" });
  const delButtons = await screen.findAllByRole("button", { name: "Sıfırla" });

  // 2-Toplam spanı çağır
  const total = screen.getByRole("heading", { name: /Çeşitler Ücreti/i });

  // 3-Toplam fiyatı 0'dır
  expect(total).toHaveTextContent(0);

  // 4-Ekle butonlarından birine tıklanır
  await user.click(addButtons[0]);

  // 5-Fiyatı 20 olur
  expect(total).toHaveTextContent(20);

  // 6-Farklı bir çeşitten 2 tane eklenir
  await user.dblClick(addButtons[2]);

  // 7-Toplam fiyat 60 olur
  expect(total).toHaveTextContent(60);

  // 8-1 tane eklenenin Sıfırla butonuna tıklanır
  await user.click(delButtons[0]);

  // 9-Toplam fiyat 40 olur
  expect(total).toHaveTextContent(40);

  // 10-2 tane eklenenin Sıfırla butonuna tıklanır
  await user.click(delButtons[2]);

  // 11-Toplam fiyat 0 olur
  expect(total).toHaveTextContent(0);

});
