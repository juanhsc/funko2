const localFetch = async () => {
  try {
    const response = await fetch("productos.json");

    const productos = await response.json();

    const stockContainer = document.getElementById("stockContainer");

    const carritoDiv = document.getElementById("cart");

    const addCart = document.getElementsByClassName("btnAgregar");

    const vaciarCarrito = document.getElementById("vaciarCarrito");

    let Comprar = document.getElementById("Comprar");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function stockProductos() {
      productos.forEach((item) => {
        stockContainer.innerHTML += `
        <div class="card">
          <img src="${item.img}" class="img-fluid">
          <div class="card-body"
            
            <h3> <p class="nombreCard">${item.nombre}</p></h3>
            <p class="preciom">$${item.precio.toLocaleString()}</p>
            <div class="btn-container">
            <button class="btn btn-dark btnAgregar" id="${
              item.id
            }">Agregar al carrito</button>
          </div>
          </div>
        </div>
        `;
      });
    }

    function eventAdd() {
      for (let i = 0; i < addCart.length; i++) {
        const add = addCart[i];
        add.addEventListener("click", agregarAlCarrito, addedProductToast);
      }
    }

    function addedProductToast() {
      Toastify({
        text: "Agregaste tu Funko al carrito",
        duration: 1500,
        close: true,
        position: "right",
        style: {
          background: "linear-gradient(to right, #326789, #00000)",
        },
      }).showToast();
    }

    function agregarAlCarrito(e) {
      const boton = e.target;
      const idBoton = boton.getAttribute("id");
      const findProduct = productos.find((product) => product.id == idBoton);
      const inCart = cart.find((product) => product.id == findProduct.id);
      if (!inCart) {
        cart.push({ ...findProduct, cantidad: 1 });
      } else {
        let filtrar = cart.filter((product) => product.id != inCart.id);
        cart = [...filtrar, { ...inCart, cantidad: inCart.cantidad + 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();
      addedProductToast();
    }

    const total = () => {
      return cart.reduce(
        (acc, product) => acc + product.precio * product.cantidad,
        0
      );
    };

    function showCart() {
      if (cart.length == 0) {
        const empty = `<h5 class="cartText">El carrito está vacío</h5>`;
        carritoDiv.innerHTML += empty;
      } else {
        const grilla = `
        <div class="grillaContainer">
          <table>
            <thead>
              <tr>
                <th></th>
                <th class="textGrilla">PRODUCTOS</th>
                <th class="textGrilla">CANTIDAD</th>
                <th class="textGrilla">PRECIO</th>
              </tr>
            </thead>
            <tbody id="bodyGrilla">
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th class="txtTotal">Total:</th>
                <th id="total">$${total().toLocaleString()}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        `;

        carritoDiv.innerHTML = grilla;
        const bodyGrilla = document.getElementById("bodyGrilla");

        for (let i = 0; i < cart.length; i++) {
          const element = cart[i];
          const { id, nombre, img, precio, cantidad } = element;
          const carrito = `
          <tr id=${id}>
            <th><img class="img-fluid" src=${img}></th>
            <th><span>${nombre}</span></th>
            <th>${cantidad}</th>
            <th>$${(cantidad * precio).toLocaleString()}</th>
          </tr>
          `;
          bodyGrilla.innerHTML += carrito;
        }
      }
    }

    vaciarCarrito.onclick = (e) => {
      Swal.fire({
        title: "¿Estás seguro/a?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5BD99D",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar",
      }).then((result) => {
        if (result.isConfirmed) {
          e.preventDefault();
          cart = [];
          localStorage.clear();
          const empty = `
          <h5 class="cartText">El carrito está vacío</h5>
          `;
          carritoDiv.innerHTML = empty;
          Swal.fire("Borrado", "Tu carrito fue vaciado", "success");
        }
      });
    };

    Comprar.onclick = (e) => {
      Swal.fire("", "GRACIAS POR TU COMPRA", "success")
      .then((result) => {
        if (result.isConfirmed) {
          e.preventDefault();
          cart = [];
          localStorage.clear();
          const empty = `
          <img src="imagenes/camion2.png"class="me-2"height="100"alt="Logo"loading="lazy"/>
          <h5 class="cartText">Recibiras tu compras en 5 dias habiles</h5>
          `;
          carritoDiv.innerHTML = empty;
          
        }
      });




    };



    stockProductos();

    eventAdd();

    showCart();
  } catch (error) {
    console.error(error);
  }
};

localFetch();
