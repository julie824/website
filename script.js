// Selección de elementos del carrito
const carrito = document.getElementById('carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const botonesAgregar = document.querySelectorAll('.btn');

// Array para almacenar los productos en el carrito
let productosEnCarrito = [];

// Función para agregar productos al carrito
function agregarProducto(e) {
    e.preventDefault();
    
    // Obtener la información del producto
    const producto = e.target.closest('.price-item');
    const imagen = producto.querySelector('.price-image').src;
    const nombre = producto.querySelector('h3').textContent;
    const precio = producto.querySelector('p').textContent;
    
    // Crear un objeto del producto
    const productoObj = {
        imagen,
        nombre,
        precio
    };
    
    // Verificar si el producto ya está en el carrito
    if (productosEnCarrito.some(producto => producto.nombre === productoObj.nombre)) {
        // Actualizar la cantidad del producto si ya está en el carrito
        productosEnCarrito = productosEnCarrito.map(producto => {
            if (producto.nombre === productoObj.nombre) {
                return {
                    ...producto,
                    cantidad: (producto.cantidad || 1) + 1
                };
            } else {
                return producto;
            }
        });
    } else {
        // Agregar nuevo producto al carrito
        productosEnCarrito.push({
            ...productoObj,
            cantidad: 1
        });
    }
    
    // Actualizar la vista del carrito
    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    // Limpiar el contenido actual del carrito
    listaCarrito.innerHTML = '';
    
    // Agregar productos al carrito
    productosEnCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><a href="#" class="btn-remove" data-nombre="${producto.nombre}">Eliminar</a></td>
        `;
        listaCarrito.appendChild(row);
    });
}

// Función para vaciar el carrito
function vaciarCarrito() {
    productosEnCarrito = [];
    mostrarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('btn-remove')) {
        const nombre = e.target.dataset.nombre;
        productosEnCarrito = productosEnCarrito.filter(producto => producto.nombre !== nombre);
        mostrarCarrito();
    }
}

// Eventos
botonesAgregar.forEach(btn => btn.addEventListener('click', agregarProducto));
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
listaCarrito.addEventListener('click', eliminarProducto);

// Inicializar el carrito al cargar la página
mostrarCarrito();





