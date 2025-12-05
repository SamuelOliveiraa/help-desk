export function formtDataToBRL(dateString: string | undefined) {
  if (dateString) {
    const date = new Date(dateString);

    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = String(date.getFullYear()).slice(2);
    const hora = String(date.getHours()).padStart(2, "0");
    const minuto = String(date.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  }
}
