const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import Card from ".";

const item = {
  name: "Salted caramel",
  imagePath: "/images/salted-caramel.png",
};

const basket = [
  {
    name: "Salted caramel",
    imagePath: "/images/salted-caramel.png",
  },
  {
    name: "Salted caramel",
    imagePath: "/images/salted-caramel.png",
  },
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
  },
];

//Prop alan bileşenleri test ediyorsak
//aldıkları propların benzerini göndeririz
test("", async () => {
  //Prop olarak göndermemiz gereken orijinal fonksiyonun yerine geçecek
  //ve bize test imkanı sağlayacak mock fonksiyonu oluşturma
  const mock = jest.fn();

  render(<Card item={item} basket={basket} setBasket={mock} />);

  //item'ın name değeri için ekrana bir span basılır
  screen.getByText(item.name);

  //resmin src'si item'ın imagePath değerine uygundur
  const img = screen.getByAltText("çeşit-resim");
  expect(img).toHaveAttribute("src", item.imagePath);

  //toplam ürün bilgisi kısmında sepetteki 2 eleman olduğu için 2 yazmalı
  const amount = screen.getByTestId("amount");
  expect(amount).toHaveTextContent(2);

  //ekle ve sıfırla butonlarına tıklanınca setBasket tetiklenir
  const user = userEvent.setup();
  const addBtn = screen.getByRole("button", { name: /Ekle/i });
  const delBtn = screen.getByRole("button", { name: /Sıfırla/i });

  //ekle butonuna tıkla
  await user.click(addBtn);

  //setBasket fonksiyonu doğru parametreyle çalıştı mı
  expect(mock).toHaveBeenCalledWith([...basket, item]);

  //sıfırla butonuna tıkla
  await user.click(delBtn);

  //setBasket fonksiyonu doğru parametreyle çalıştı mı
  expect(mock).toHaveBeenLastCalledWith([
    {
      name: "Chocolate",
      imagePath: "/images/chocolate.png",
    },
  ]);
});
