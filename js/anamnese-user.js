$(document).on("ready", async () => {
    $("form").on("submit", async () => {
        const dadosUsuario = JSON.parse(localStorage.getItem(("dadosUsuario")))
        const checkedForms = $("input[value=true]:checked").length
        const tipoPerfil = checkedForms > 3 ? "Perfil Especial" : "Perfil Normal";

        $.put(`https://pit2-api.pd8edx.easypanel.host/api/usuario/cliente/`, {id: dadosUsuario.cliente.id, cliente: {tipoPerfil}})
        alert('Perfil de anamnese enviado!')
        window.location.href = './dashboard-user.html'
    })

})
