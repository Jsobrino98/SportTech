function mostrarClaveAdmin(select) {
    const claveGroup = document.getElementById("clave-admin-group");
    if (select.value === "ADMIN") {
        claveGroup.style.display = "block";
    } else {
        claveGroup.style.display = "none";
    }
}

function validarClaveAdmin() {
    const rol = document.getElementById("rol").value;
    const clave = document.getElementById("claveAdmin").value;

    if (rol === "ADMIN" && clave !== "ADMIN123") {
        alert("Clave de administrador incorrecta.");
        return false;
    }
    return true;
}
