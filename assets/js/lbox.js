const images = document.querySelectorAll(".article .content img");

// Crear overlay global
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.inset = "0";
overlay.style.background = "rgba(0,0,0,0.5)";
overlay.style.backdropFilter = "blur(6px)";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.visibility = "hidden";
overlay.style.opacity = "0";
overlay.style.transition = "opacity .3s ease";
overlay.style.zIndex = "9999";

// Imagen ampliada
const bigImg = document.createElement("img");
bigImg.style.maxWidth = "80%";
bigImg.style.maxHeight = "80%";
bigImg.style.border = "6px solid #2563eb";
bigImg.style.borderRadius = "8px";
bigImg.style.boxShadow = "0 0 25px rgba(0,0,0,0.8)";
bigImg.style.pointerEvents = "none"; // evita cerrar al clicar en la imagen

overlay.appendChild(bigImg);
document.body.appendChild(overlay);

// Abrir imagen en foco
images.forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    bigImg.src = img.src;
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
  });
});

// Cerrar al clicar fuera
overlay.addEventListener("click", () => {
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.visibility = "hidden";
  }, 300);
});