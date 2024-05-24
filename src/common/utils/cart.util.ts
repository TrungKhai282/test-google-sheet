export const handleChangeCart = ({
  product,
  quantity,
  type,
}: {
  product: any;
  quantity?: number;
  type: "minus" | "plus" | "value";
}) => {
  let cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cartStorage && cartStorage.length > 0) {
    let findItem = cartStorage.find(
      (item: any) => item.product_slug === product.slug
    );
    if (findItem) {
      let qty = 0;
      switch (type) {
        case "minus":
          qty = findItem.quantity - 1;
          break;

        case "plus":
          qty = findItem.quantity + 1;
          break;

        case "value":
          qty = quantity || findItem.quantity + 1;
          break;
        default:
          break;
      }
      let cart = [
        ...cartStorage.filter(
          (item: any) => item.product_slug !== findItem.product_slug
        ),
      ];

      cart.splice(cartStorage.indexOf(findItem), 0, {
        ...findItem,
        quantity: qty,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let cart = [
        ...cartStorage,
        {
          product_slug: product.slug,
          quantity: quantity ? quantity : 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    let cart = [
      {
        product_slug: product.slug,
        quantity: quantity ? quantity : 1,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.dispatchEvent(new Event("storage"));
};

export const removeOutOfCart = (slug: string) => {
  let cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cartStorage && cartStorage.length > 0) {
    const findItem = cartStorage.find(
      (item: any) => item.product_slug === slug
    );

    if (findItem) {
      if (cartStorage.length > 1) {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...cartStorage.filter((item: any) => item.product_slug !== slug),
          ])
        );
      } else {
        localStorage.removeItem("cart");
      }
    }
  }

  window.dispatchEvent(new Event("storage"));
};

export const getAllQuantityCart = () => {
  let cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  let result = 0;
  cartStorage.forEach((item: any) => {
    result = result + item.quantity;
  });

  return result;
};
